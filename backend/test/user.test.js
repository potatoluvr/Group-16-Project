import request from "supertest";
import app from "../index";

describe("User Profile API", () => {
  let userId;

  it("should fetch user profile", async () => {
    const res = await request(app).get(`/users/${userId}`); 
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("profile");
  });

  it("should update user profile", async () => {
    const res = await request(app).post("/api/users/update").send({
      id: userId, 
      fullName: "Updated User",
      address: "New Address",
      city: "New City",
      state: "NY",
      zipCode: "10001",
      skills: ["Leadership"],
      availability: ["2025-06-01"],
    });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Profile updated successfully!");
  });

  it("should return an error for invalid user ID", async () => {
    const res = await request(app).get("/api/users/9999"); 
    expect(res.status).toBe(404);
  });
});
