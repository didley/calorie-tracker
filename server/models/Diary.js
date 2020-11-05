const { Schema, model } = require("mongoose");

const DiarySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    entryDate: {
      type: String,
      required: true,
    },
    notes: String,
    eaten: [
      {
        chosenOptions: {
          serving: { servingName: String, servingSize: Number },
          chosenAmount: Number,
          chosenMacros: Object,
        },
        food_id: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Food",
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
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Food",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = DiaryModel = model("diary", DiarySchema);
