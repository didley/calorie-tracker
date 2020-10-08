const { Schema, model } = require("mongoose");

const DiarySchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  notes: String,
  eaten: Array,
  toEat: [
    {
      chosenOptions: { serving: { servingName: String, servingSize: Number } },
      food: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Food",
      },
    },
  ],
});

module.exports = Diary = model("diary", DiarySchema);
