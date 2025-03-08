import request from "supertest";
import server from "../server.js"; // Directly import the server

describe("Server Initialization", () => {
  afterAll(() => {
    server.close(); // Close the server after tests run
  });

  it("should start the server on port 5000 when PORT is undefined", () => {
    const port = server.address().port;
    expect(port).toBe(5000); // Expect server to start on port 5000 by default
  });

  it("should respond to a known route (e.g., /api/auth)", async () => {
    const response = await request(server).get("/api/auth");
    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.status).toBeLessThan(500);
  });
});
