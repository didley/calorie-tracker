import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import { Diary } from "../diary/diary.model";
import { Food } from "../food/food.model";
import { ROLES } from "../../utils/roleAuth/ROLES";

const baseUserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    dateOfBirth: String,
    sex: {
      type: String,
      enum: ["male", "female", ""],
      default: "",
    },
    measurements: { heightCm: Number, currentWeightKg: Number },
    goals: {
      weightGoalKg: Number,
      energyGoalKJ: Number,
    },
    preferences: { metricSystem: Boolean, useKJ: Boolean },
    country: {
      type: String,
      validate: [validator.isISO31661Alpha3, "Invalid country"],
      trim: true,
      uppercase: true,
      required: [true, "Country is required"],
    },
    role: {
      type: String,
      enum: ROLES,
      default: "guest",
    },
  },
  { timestamps: true }
);

baseUserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (err) {
      return next(err);
    }
  }

  next();
});

baseUserSchema.pre("deleteOne", async function (next) {
  const userId = this._conditions._id;

  console.log(`*** deleteOne ran on userId${userId} ***`);

  try {
    await Diary.deleteMany({ userId: userId });
    await Food.deleteMany({ createdBy: userId });
  } catch (err) {
    return next(err);
  }

  next();
});

baseUserSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compare(inputPassword, this.password);
  },
};
export const BaseUser = mongoose.model("baseuser", baseUserSchema);

export const Guest = BaseUser.discriminator(
  "guest",
  new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
  })
);

export const User = BaseUser.discriminator(
  "user",
  new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: { type: String, required: true, trip: true, minLength: 7 },
  })
);

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     dateOfBirth: String,
//     sex: {
//       type: String,
//       enum: ["male", "female", ""],
//       default: "",
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },
//     password: { type: String, required: true, trip: true, minLength: 7 },
//     measurements: { heightCm: Number, currentWeightKg: Number },
//     goals: {
//       weightGoalKg: Number,
//       energyGoalKJ: Number,
//     },
//     preferences: { metricSystem: Boolean, useKJ: Boolean },
//     country: {
//       type: String,
//       validate: [validator.isISO31661Alpha3, "Invalid country"],
//       trim: true,
//       uppercase: true,
//       required: [true, "Country is required"],
//     },
//     role: {
//       type: String,
//       enum: ROLES,
//       default: "basic",
//     },
//   },
//   { timestamps: true }
// );

// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     try {
//       this.password = await bcrypt.hash(this.password, 10);
//     } catch (err) {
//       return next(err);
//     }
//   }

//   next();
// });

// userSchema.pre("deleteOne", async function (next) {
//   const userId = this._conditions._id;

//   try {
//     await Diary.deleteMany({ userId: userId });
//     await Food.deleteMany({ createdBy: userId });
//   } catch (err) {
//     return next(err);
//   }

//   next();
// });

// userSchema.methods = {
//   checkPassword: function (inputPassword) {
//     return bcrypt.compare(inputPassword, this.password);
//   },
// };

// export const User = mongoose.model("user", userSchema);
