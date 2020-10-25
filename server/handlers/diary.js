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
        entryDate: date,
      }).populate(["toEat.food_id", "eaten.food_id"]);

      if (!diaryEntry) {
        res.json(`no diary entry found for ${date}`);
      }

      res.json(diaryEntry);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  },
  addFoodToEntryList: async (req, res) => {
    const { date } = req.params;
    const { list } = req.query;
    try {
      const options = { upsert: true };

      await Diary.findOneAndUpdate(
        { entryDate: date },
        { $push: { [list]: req.body } },
        options
      );

      res.json({
        msg: `Food added to ${list === "eaten" ? "eaten" : "to eat"} list`,
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  },
  removeFoodFromEntry: async (req, res) => {
    const { date, id } = req.params;

    try {
      const deleteFoodReq = await Diary.updateOne(
        { entryDate: date },
        { $pull: { toEat: { _id: id }, eaten: { _id: id } } }
      );

      deleteFoodReq.nModified > 0
        ? res.json({ msg: `Food removed from ${date}` })
        : res.status(404).json({ msg: "Food not found" });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  },
};
