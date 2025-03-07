import request from "supertest";
import app from "../index";

describe("Volunteer Matching API", () => {
  it("should match a volunteer to an event", async () => {
    const res = await request(app).post("/api/volunteers/match").send({
      volunteerId,
      eventId,
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("should fetch volunteer history", async () => {
    const res = await request(app).get("/api/volunteers/history/${volunteerId}"); 
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.history)).toBe(true);
  });

  it("should return an error for invalid volunteer ID", async () => {
    const res = await request(app).get("/api/volunteers/history/9999"); // Non-existent volunteer
    expect(res.status).toBe(404);
  });
});
