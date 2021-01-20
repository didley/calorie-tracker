import { Diary } from "./diary.model";

export default {
  getDiaryEntryByDate: async (req, res) => {
    let { date } = req.params;
    try {
      const diaryEntry = await Diary.findOne({
        userId: req.user._id,
        entryDate: date,
      }).populate(["lists.toEat.chosenFood", "lists.eaten.chosenFood"]);

      if (!diaryEntry) {
        return res.json({ eaten: [], toEat: [], notes: "" });
      }

      res.json(diaryEntry);
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  addFoodToEntryList: async (req, res) => {
    // body {name:listName, items:[{foodChoice}]}
    const { date } = req.params;
    const { listName, items } = req.body;

    const listSelector = `lists.${listName}`;

    try {
      const data = await Diary.findOneAndUpdate(
        { entryDate: date, userId: req.user._id },
        { $push: { [listSelector]: items } },
        { upsert: true, new: true }
      );

      res.json({ data: data.lists });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  updateDiaryEntry: async (req, res) => {
    // body {note/listsObj: changed}
    const { date } = req.params;
    const { note, lists } = req.body;

    if (!note && !lists) {
      return res.status(400).json({
        err: "patch request can only be made to diary note or lists object",
      });
    }

    try {
      const data = await Diary.findOneAndUpdate(
        { entryDate: date, userId: req.user._id },
        req.body,
        { upsert: true, new: true }
      );
      res.json(data);
    } catch (err) {
      console.log({ err });
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

      res.status(200).send();
    } catch (err) {
      res.status(400).json({ err });
    }
  },
};
