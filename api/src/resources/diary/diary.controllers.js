import { Diary } from "./diary.model";
import { format } from "date-fns";

export default {
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
      })
        .populate(["toEat.food_id", "eaten.food_id"])
        .lean();

      if (!diaryEntry) {
        return res.json({ eaten: [], toEat: [], notes: "" }); // returns empty entry instead of 404

        // return res
        //   .status(404)
        //   .json({ msg: `no diary entry found for ${date}` });
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
      const options = { upsert: true, new: true };

      const data = await Diary.findOneAndUpdate(
        { entryDate: date, userId: req.user._id },
        { $push: { [adjustedList]: req.body } },
        options
      );

      res.json({
        data: data,
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
  removeSelectedFoodsFromEntry: async (req, res) => {
    // takes body {selectedItems:["IDs"]}
    const { date } = req.params;
    const data = req.body.selectedItems;

    try {
      const deleteFoodReq = await Diary.updateMany(
        { entryDate: date, userId: req.user._id },
        { $pull: { toEat: { _id: data }, eaten: { _id: data } } }
      );

      deleteFoodReq.nModified > 0
        ? res.json({ msg: `${data.length} foods removed from ${date}` })
        : res.status(404).json({ msg: "Food not found" });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  updateNote: async (req, res) => {
    const { date } = req.params;
    const { note } = req.body;

    try {
      const data = await Diary.findOneAndUpdate(
        { entryDate: date, userId: req.user._id },
        { $push: { note } }
      );

      res.json({
        data: data,
        msg: `Note updated`,
      });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
};
