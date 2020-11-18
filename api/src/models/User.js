const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
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

const User = model("User", userSchema);

module.exports = User;
