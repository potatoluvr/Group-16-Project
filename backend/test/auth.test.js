import request from "supertest";
import app from "../index";

describe("Auth Routes", () => {
  let server;

  beforeAll(() => {
    server = app.listen(5000); // Start the server on port 5000 before the tests
  });

  afterAll(() => {
    server.close(); // Close the server after the tests
  });

  it("should register a new user", async () => {
    const response = await request(server).post("/api/auth/register").send({
      email: "admin@gmail.com", // Correct field for email
      password: "password123", // Password must be >= 8 characters
    });

    console.log(response.body); // For debugging

    expect(response.status).toBe(201); // Expect HTTP status 201 for created
    expect(response.body).toHaveProperty(
      "message",
      "User registered successfully"
    );
  });

  it("should login a user", async () => {
    const response = await request(server).post("/api/auth/login").send({
      email: "admin@gmail.com", // Correct field for email
      password: "password123", // Password must be >= 8 characters
    });

    console.log(response.body); // For debugging

    expect(response.status).toBe(200); // Expect HTTP status 200 for success
    expect(response.body).toHaveProperty("token"); // Expect a JWT token in the response
  });

  it("should return an error for invalid email during registration", async () => {
    const response = await request(server).post("/api/auth/register").send({
      email: "invalid@gmail.com", // Not an accepted email
      password: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Invalid email address");
  });

  it("should return an error for short password during registration", async () => {
    const response = await request(server).post("/api/auth/register").send({
      email: "admin@gmail.com",
      password: "short", // Less than 8 characters
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Password must be at least 8 characters"
    );
  });

  it("should return an error for invalid email during login", async () => {
    const response = await request(server).post("/api/auth/login").send({
      email: "invalid@gmail.com", // Not an accepted email
      password: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Invalid email address");
  });

  it("should return an error for short password during login", async () => {
    const response = await request(server).post("/api/auth/login").send({
      email: "admin@gmail.com",
      password: "short", // Less than 8 characters
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Password must be at least 8 characters"
    );
  });

  it("should return an error when accessing profile without a token", async () => {
    const response = await request(server).get("/api/auth/profile");

    expect(response.status).toBe(401); // Unauthorized
    expect(response.body).toHaveProperty("message", "Unauthorized");
  });

  it("should return user profile data with a valid token", async () => {
    // First, login to get a valid token
    const loginResponse = await request(server).post("/api/auth/login").send({
      email: "admin@gmail.com",
      password: "password123",
    });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty("token");

    const token = loginResponse.body.token;

    // Now, access the profile route with the token
    const profileResponse = await request(server)
      .get("/api/auth/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(profileResponse.status).toBe(200);
    expect(profileResponse.body).toHaveProperty("message", "User profile data");
    expect(profileResponse.body).toHaveProperty("email", "admin@gmail.com");
    expect(profileResponse.body).toHaveProperty("role", "admin");
    expect(profileResponse.body).toHaveProperty("userId", 1);
  });
});
