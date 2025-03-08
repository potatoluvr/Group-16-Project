import request from "supertest";
import app from "../index";

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
