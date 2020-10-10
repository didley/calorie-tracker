const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true },
  dateOfBirth: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  measurements: { heightCm: Number, currentWeightKg: Number },
  goalWeightKg: Number,
});

const User = model("User", UserSchema);

module.exports = User;
