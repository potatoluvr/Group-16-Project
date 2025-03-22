import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { UserCredentials } from "../models/User";
import request from "supertest";
import app from "../index";

describe("User Password Hashing", () => {
  let userId;
  const userData = {
    email: "testuser@example.com",
    password: "PlainTextPass123",
    role: "volunteer",
  };

  it("should hash the password before saving", async () => {
    // Create user
    const res = await request(app).post("/api/auth/register").send(userData);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("success", true);
    userId = res.body.userId;

    // Fetch user from DB
    const createdUser = await UserCredentials.findOne({
      email: userData.email,
    });

    expect(createdUser).toBeDefined();
    expect(createdUser.password).not.toBe(userData.password); // Ensure hashing

    // Compare hashed password with plaintext
    const isMatch = await bcrypt.compare(
      userData.password,
      createdUser.password
    );
    expect(isMatch).toBe(true);
  });

  afterAll(async () => {
    await UserCredentials.deleteMany({ email: userData.email }); // Cleanup
    await mongoose.connection.close();
  });
});

describe("User Profile API - Error Handling", () => {
  let authToken;
  let userId;

  beforeAll(async () => {
    // Register a test user and get a valid token
    const res = await request(app).post("/api/auth/register").send({
      email: "testuser@example.com",
      password: "TestPass123!",
      role: "volunteer",
    });

    authToken = res.body.token;
    userId = res.body.userId;
  });

  it("should return 404 if profile is not found", async () => {
    // Try fetching profile of a non-existent user
    const res = await request(app)
      .get("/api/users/profile")
      .set("Authorization", `Bearer invalidToken`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Profile not found");
  });

  it("should return 400 if trying to create a profile that already exists", async () => {
    const profileData = {
      fullName: "Existing User",
      address1: "123 Main St",
      city: "Houston",
      state: "TX",
      zipCode: "77001",
      skills: ["Communication"],
      availability: ["2025-06-10"],
    };

    // First profile creation (should succeed)
    await request(app)
      .post("/api/users/profile")
      .set("Authorization", `Bearer ${authToken}`)
      .send(profileData);

    // Second attempt (should fail with 400)
    const res = await request(app)
      .post("/api/users/profile")
      .set("Authorization", `Bearer ${authToken}`)
      .send(profileData);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Profile already exists.");
  });

  it("should return 400 if updating a non-existent profile", async () => {
    const updatedProfile = {
      fullName: "Nonexistent User",
      address1: "404 Nowhere St",
      city: "Missing City",
      state: "XX",
      zipCode: "00000",
      skills: ["Problem-solving"],
      availability: ["2025-07-01"],
    };

    const res = await request(app)
      .put("/api/users/profile")
      .set("Authorization", `Bearer ${authToken}`)
      .send(updatedProfile);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Profile not found");
  });

  it("should handle server errors gracefully", async () => {
    jest.spyOn(UserProfile, "findOne").mockImplementationOnce(() => {
      throw new Error("Database error");
    });

    const res = await request(app)
      .get("/api/users/profile")
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message", "Server error");

    jest.restoreAllMocks();
  });

  afterAll(async () => {
    await UserCredentials.deleteMany({ email: "testuser@example.com" });
  });
});
