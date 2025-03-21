import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserCredentialsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "volunteer"],
    default: "volunteer",
  },
  profileCompleted: {
    type: Boolean,
    default: false,
  },
});

UserCredentialsSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const UserCredentials = mongoose.model(
  "UserCredentials",
  UserCredentialsSchema
);

const UserProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserCredentials",
    required: true,
    unique: true,
  },
  fullName: { type: String, required: true, maxlength: 50 },
  address1: { type: String, required: true, maxlength: 100 },
  address2: { type: String, maxlength: 100, default: "" },
  city: { type: String, required: true, maxlength: 100 },
  state: {
    type: String,
    required: true,
    enum: [
      "AL",
      "AK",
      "AZ",
      "AR",
      "CA",
      "CO",
      "CT",
      "DE",
      "FL",
      "GA",
      "HI",
      "ID",
      "IL",
      "IN",
      "IA",
      "KS",
      "KY",
      "LA",
      "ME",
      "MD",
      "MA",
      "MI",
      "MN",
      "MS",
      "MO",
      "MT",
      "NE",
      "NV",
      "NH",
      "NJ",
      "NM",
      "NY",
      "NC",
      "ND",
      "OH",
      "OK",
      "OR",
      "PA",
      "RI",
      "SC",
      "SD",
      "TN",
      "TX",
      "UT",
      "VT",
      "VA",
      "WA",
      "WV",
      "WI",
      "WY",
    ],
  },
  zipCode: {
    type: String,
    required: true,
    match: /^\d{5}(-\d{4})?$/,
  },
  skills: {
    type: [String],
    required: true,
  },
  preferences: { type: String, maxlength: 500 },
  availability: {
    type: [Date],
    required: true,
  },
});

const UserProfile = mongoose.model("UserProfile", UserProfileSchema);

export { UserCredentials, UserProfile };
