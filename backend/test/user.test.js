import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { UserCredentials } from "../models/User"; // Ensure the correct path
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
    // Step 1: Create user
    const res = await request(app).post("/api/auth/register").send(userData);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("success", true);
    userId = res.body.userId;

    // Step 2: Fetch user from DB
    const createdUser = await UserCredentials.findOne({
      email: userData.email,
    });

    expect(createdUser).toBeDefined();
    expect(createdUser.password).not.toBe(userData.password); // Ensure hashing

    // Step 3: Compare hashed password with plaintext
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

describe("User Profile API", () => {
  let userId = 1;

  it("should fetch user profile", async () => {
    const res = await request(app).get(`/api/users/${userId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("profile");
    expect(res.body.profile).toHaveProperty("fullName");
    expect(res.body.profile).toHaveProperty("skills");
  });

  it("should update user profile", async () => {
    const updatedProfile = {
      id: userId,
      fullName: "Updated User",
      address: "New Address",
      city: "New City",
      state: "NY",
      zipCode: "10001",
      skills: ["Leadership"],
      availability: ["2025-06-01"],
    };

    const res = await request(app)
      .post("/api/users/update")
      .send(updatedProfile);

    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("message", "Profile updated successfully!");

    const profileRes = await request(app).get(`/api/users/${userId}`);
    expect(profileRes.status).toBe(200);
    expect(profileRes.body.profile).toMatchObject(updatedProfile);
  });

  it("should return an error for invalid user ID", async () => {
    const res = await request(app).get("/api/users/9999");
    expect(res.status).toBe(404);
  });
});
