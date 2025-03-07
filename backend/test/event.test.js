import request from "supertest";
import app from "../index";

describe("Event Management API", () => {
  it("should create a new event", async () => {
    const res = await request(app).post("/api/events/create-event").send({
      title: "Community Cleanup",
      description: "Cleaning up the local park",
      requiredSkills: ["Teamwork"],
      urgency: "High",
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("should fetch events", async () => {
    const res = await request(app).get("/api/events");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should return error for missing event fields", async () => {
    const res = await request(app).post("/api/events/create-event").send({});
    expect(res.status).toBe(400);
  });
});
