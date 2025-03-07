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
});
