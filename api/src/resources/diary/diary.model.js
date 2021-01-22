import mongoose from "mongoose";

const chosenFoodSchema = new mongoose.Schema({
  chosenOptions: {
    serving: { servingName: String, servingSize: Number },
    chosenAmount: Number,
    chosenMacros: Object,
  },
  chosenFood: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "food",
  },
});

const diarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "user",
    },
    entryDate: {
      type: String,
      required: true,
    },
    note: { type: String, trim: true },
    toEat: [chosenFoodSchema],
    eaten: [chosenFoodSchema],
  },
  { timestamps: true }
);

export const Diary = mongoose.model("diary", diarySchema);
