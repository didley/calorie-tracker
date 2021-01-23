import { Diary } from "./diary.model";

export default {
  getDiaryEntryByDate: async (req, res) => {
    let { date } = req.params;
    try {
      const diaryEntry = await Diary.findOne({
        userId: req.user._id,
        entryDate: date,
      }).populate(["toEat.chosenFood", "eaten.chosenFood"]);

      if (!diaryEntry) {
        return res.json({ eaten: [], toEat: [], notes: "" });
      }

      res.status(200).json(diaryEntry);
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  addFoodToEntryList: async (req, res) => {
    // body {name:listName, items:[{foodChoice}]}
    const { date } = req.params;
    const { listName, items } = req.body;

    try {
      await Diary.updateOne(
        { entryDate: date, userId: req.user._id },
        { $push: { [listName]: items } },
        { upsert: true }
      );

      res.json({ msg: "Food added" });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  updateDiaryEntry: async (req, res) => {
    // body {note: String, or  toEat: {}, eaten: {}}
    const { date } = req.params;

    const updates = Object.keys(req.body);
    const allowedUpdates = ["eaten", "toEat", "note"];
    const validUpdate = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!validUpdate) {
      return res.status(400).json({
        err:
          "Invalid updates, updates can only be made to diary eaten, toEat & note",
      });
    }

    try {
      const doc = await Diary.findOneAndUpdate(
        { entryDate: date, userId: req.user._id },
        { $set: req.body },
        { upsert: true, new: true }
      );

      // Deletes diary document if empty
      const { eaten, toEat, note } = doc;
      if ((eaten.length === 0, toEat.length === 0, note === "")) {
        await Diary.deleteOne({ entryDate: date, userId: req.user._id });
      }

      res.status(200).json({ msg: "Diary updated" });
    } catch (err) {
      res.json({ err });
    }
  },
  removeFoodsByIds: async (req, res) => {
    // takes IDs from params separated by commas (diary/:date/ID,ID,ID)
    const { date, ids } = req.params;

    try {
      const idsArray = ids.split(",");
      await Diary.updateMany(
        { entryDate: date, userId: req.user._id },
        {
          $pull: {
            "lists.toEat": { _id: idsArray },
            "lists.eaten": { _id: idsArray },
          },
        }
      );

      res.status(200).json({ msg: "Foods removed" });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
};
