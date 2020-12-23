import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dateOfBirth: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    measurements: { heightCm: Number, currentWeightKg: Number },
    goalWeightKg: Number,
  },
  { timestamps: true }
);

userSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compare(inputPassword, this.password);
  },
};

export const User = mongoose.model("user", userSchema);
