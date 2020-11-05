const Diary = require("../models/Diary");
const { format } = require("date-fns");

module.exports = {
  getDiaryEntry: async (req, res) => {
    let { date } = req.params;
    // returns today if no date provided
    if (!date) {
      date = format(new Date(), "yyyy-MM-dd");
    }

    try {
      const diaryEntry = await Diary.findOne({
        userId: req.user._id,
        entryDate: date,
      }).populate(["toEat.food_id", "eaten.food_id"]);

      if (!diaryEntry) {
        return res.json({ msg: `no diary entry found for ${date}` });
      }

      res.json(diaryEntry);
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  addFoodToEntryList: async (req, res) => {
    // eg. /api/diary/2020-10-03/add-food?list=to-eat || /api/diary/2020-10-03/add-food || /api/diary/2020-10-03/add-food?list=eaten
    const { date } = req.params;
    const { list } = req.query;
    let adjustedList;
    if (list === "to-eat") {
      adjustedList = "toEat";
    } else {
      adjustedList = "eaten";
    }

    try {
      const options = { upsert: true };

      await Diary.findOneAndUpdate(
        { entryDate: date, userId: req.user._id },
        { $push: { [adjustedList]: req.body } },
        options
      );

      res.json({
        msg: `Food added to ${
          adjustedList === "eaten" ? "eaten" : "to eat"
        } list`,
      });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  removeFoodFromEntry: async (req, res) => {
    const { date, id } = req.params;

    try {
      const deleteFoodReq = await Diary.updateOne(
        { entryDate: date, userId: req.user._id },
        { $pull: { toEat: { _id: id }, eaten: { _id: id } } }
      );

      deleteFoodReq.nModified > 0
        ? res.json({ msg: `Food removed from ${date}` })
        : res.status(404).json({ msg: "Food not found" });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
};
