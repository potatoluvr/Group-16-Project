import request from "supertest";
import app from "../index";

describe("Volunteer Matching API", () => {
  let volunteerId = 2;
  let eventId = 1;

  it("should match a volunteer to an event", async () => {
    const res = await request(app).post("/api/volunteers/match").send({
      volunteerId,
      eventId,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty(
      "message",
      `Volunteer matched to event: Community Cleanup`
    );
  });

  it("should fetch volunteer history", async () => {
    const res = await request(app).get(
      `/api/volunteers/history/${volunteerId}`
    );

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(Array.isArray(res.body.history)).toBe(true);
    expect(res.body.history.length).toBeGreaterThan(0);
    expect(res.body.history[0]).toHaveProperty("eventTitle");
  });

  it("should return an error for invalid volunteer ID", async () => {
    const res = await request(app).get("/api/volunteers/history/9999"); // Non-existent volunteer
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("message", "No volunteer history found.");
  });

  it("should return an error when matching volunteer to a non-existent event", async () => {
    const res = await request(app).post("/api/volunteers/match").send({
      volunteerId,
      eventId: 9999,
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("message", "Invalid volunteer or event.");
  });

  it("should confirm the volunteer was added to history", async () => {
    const res = await request(app).get(
      `/api/volunteers/history/${volunteerId}`
    );

    expect(res.status).toBe(200);
    expect(res.body.history.some((h) => h.eventId === eventId)).toBe(true);
  });
});
