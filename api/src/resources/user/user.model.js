import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dateOfBirth: Date,
    sex: { type: String, enum: ["male", "female"] },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    measurements: { heightCm: Number, currentWeightKg: Number },
    goals: {
      weightGoalKg: Number,
      energyGoalKJ: Number,
    },
    preferences: { metricSystem: Boolean, useKJ: Boolean },
    country: {
      type: String,
      validate: [validator.isISO31661Alpha2, "Invalid country"],
      trim: true,
      uppercase: true,
      required: [true, "Country is required"],
    },
  },
  { timestamps: true }
);

userSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compare(inputPassword, this.password);
  },
};

export const User = mongoose.model("user", userSchema);
