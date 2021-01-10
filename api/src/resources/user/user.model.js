import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    dateOfBirth: String,
    sex: {
      type: String,
      enum: ["male", "female", ""],
      default: "",
    },
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
      availableCountry: {
        type: String,
        validate: {
          validator: (selectOption) =>
            validator.isISO31661Alpha3(selectOption) ||
            selectOption === "OTHER",
          message: "Invalid country",
        },
        trim: true,
        uppercase: true,
        required: [true, "Country is required"],
      },
      otherCountry: { type: String, trim: true, uppercase: true },
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
