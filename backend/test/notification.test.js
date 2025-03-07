import request from "supertest";
import app from "../index.js";

describe("Notification API", () => {
  it("should send a notification", async () => {
    const res = await request(app)
      .post("/api/notifications/notify")
      .send({ volunteerId: 1, message: "Event Reminder" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
  });

  it("should return an error for missing fields", async () => {
    const res = await request(app).post("/api/notifications/notify").send({});
    expect(res.statusCode).toEqual(400);
  });
});
