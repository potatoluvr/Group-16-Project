import request from "supertest";
import app from "../index";
import { UserCredentials } from "../models/User.js";
import { Event } from "../models/Event.js";
import { VolunteerHistory } from "../models/VolunteerHistory.js";
import { jest } from "@jest/globals";

describe("Volunteer Matching API", () => {
  let volunteerId, eventId;

  beforeAll(async () => {
    // Create a volunteer user
    const user = new UserCredentials({
      email: "volunteer@example.com",
      password: "password123",
      role: "volunteer",
    });
    await user.save();
    volunteerId = user._id;

    // Create an event
    const event = new Event({
      title: "Beach Cleanup",
      requiredSkills: ["Teamwork"],
      urgency: "High",
    });
    await event.save();
    eventId = event._id;
  });

  afterAll(async () => {
    await UserCredentials.deleteMany();
    await Event.deleteMany();
    await VolunteerHistory.deleteMany();
  });

  it("should return 404 if volunteer history not found", async () => {
    const res = await request(app).get(
      "/api/volunteers/history/000000000000000000000000"
    );
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("No volunteer history found.");
  });

  it("should match a volunteer to an event successfully", async () => {
    const res = await request(app).post("/api/volunteers/match").send({
      volunteerId,
      eventId,
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Volunteer matched successfully!");
  });

  it("should return 400 for invalid volunteer ID (not a volunteer)", async () => {
    const user = new UserCredentials({
      email: "nonvolunteer@example.com",
      password: "password123",
      role: "admin",
    });
    await user.save();

    const res = await request(app).post("/api/volunteers/match").send({
      volunteerId: user._id,
      eventId,
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid volunteer ID");
  });

  it("should return 400 for invalid event ID", async () => {
    const res = await request(app).post("/api/volunteers/match").send({
      volunteerId,
      eventId: "000000000000000000000000", // Non-existent event
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid event ID");
  });

  it("should fetch volunteer history after matching", async () => {
    // Create a match for the volunteer and event
    const match = new VolunteerHistory({
      volunteerId,
      eventId,
      status: "Upcoming",
    });
    await match.save();

    // fetch the history
    const res = await request(app).get(
      `/api/volunteers/history/${volunteerId}`
    );

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.history)).toBe(true);
    expect(res.body.history.length).toBeGreaterThan(0);
    expect(res.body.history[0]).toHaveProperty("eventId"); // Ensure event data is populated
  });

  it("should return 500 on server error", async () => {
    jest.spyOn(VolunteerHistory, "find").mockImplementation(() => {
      throw new Error("Database failure");
    });

    const res = await request(app).get(
      `/api/volunteers/history/${volunteerId}`
    );

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Server error");

    jest.restoreAllMocks(); // Clean up mocks
  });

  it("should return 400 if volunteer does not exist", async () => {
    const res = await request(app).post("/api/volunteers/match").send({
      volunteerId: "000000000000000000000000", // Non-existent ID
      eventId,
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid volunteer ID");
  });

  it("should return 400 if event does not exist", async () => {
    const res = await request(app).post("/api/volunteers/match").send({
      volunteerId,
      eventId: "000000000000000000000000", // Invalid event ID
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid event ID");
  });

  it("should save the volunteer-event match in the database", async () => {
    await request(app).post("/api/volunteers/match").send({
      volunteerId,
      eventId,
    });

    const match = await VolunteerHistory.findOne({ volunteerId, eventId });

    expect(match).not.toBeNull();
    expect(match.status).toBe("Upcoming");
  });

  it("should return success message after matching", async () => {
    const res = await request(app).post("/api/volunteers/match").send({
      volunteerId,
      eventId,
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Volunteer matched successfully!");
  });

  // test case for invalid volunteer ID format
  it("should return 400 for invalid volunteer ID format", async () => {
    const res = await request(app).post("/api/volunteers/match").send({
      volunteerId: "invalid_id_format",
      eventId,
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid volunteer ID format");
  });

  // test case for invalid event ID format
  it("should return 400 for invalid event ID format", async () => {
    const res = await request(app).post("/api/volunteers/match").send({
      volunteerId,
      eventId: "invalid_id_format",
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid event ID format");
  });
});
