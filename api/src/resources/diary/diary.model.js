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
    note: String,
    toEat: [chosenFoodSchema],
    eaten: [chosenFoodSchema],
  },
  { timestamps: true }
);

diarySchema.set("toJSON", { virtuals: true });
diarySchema.virtual("totalEatenKJ").get(function () {
  const eatenKJ = this.eaten.map(
    (food) => food.chosenOptions.chosenMacros.EnergyKJ
  );
  return eatenKJ.reduce((a, b) => a + b, 0).toFixed();
});
export const Diary = mongoose.model("diary", diarySchema);
