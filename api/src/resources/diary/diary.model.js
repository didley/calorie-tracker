import mongoose from "mongoose";

const DiarySchema = new mongoose.Schema(
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
    note: String,
    eaten: [
      {
        chosenOptions: {
          serving: { servingName: String, servingSize: Number },
          chosenAmount: Number,
          chosenMacros: Object,
        },
        food_id: {
          type: mongoose.SchemaTypes.ObjectId,
          required: true,
          ref: "food",
        },
      },
    ],
    toEat: [
      {
        chosenOptions: {
          serving: { servingName: String, servingSize: Number },
          chosenAmount: Number,
          chosenMacros: Object,
        },
        food_id: {
          type: mongoose.SchemaTypes.ObjectId,
          required: true,
          ref: "food",
        },
      },
    ],
  },
  { timestamps: true }
);

export const Diary = mongoose.model("diary", DiarySchema);
