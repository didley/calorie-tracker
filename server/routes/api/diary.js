const express = require("express");
const router = express.Router();
const { format } = require("date-fns");

// const dateOnlyToday = format(new Date(), "yyyy-MM-dd");
// console.log(new Date(dateOnlyToday));

const DiaryModel = require("../../models/Diary");
const FoodModel = require("../../models/Food");

/** @Route GET api/diary/:date @access private @desc get diary entry form param date */
router.get(["/", "/:date"], async (req, res) => {
  let { date } = req.params;
  // returns today if no date provided
  if (!date) {
    date = format(new Date(), "yyyy-MM-dd");
  }

  try {
    const diaryEntry = await DiaryModel.findOne({
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
});

/** @Route POST api/diary/:date/add-food @access private @desc add food to diary list */
router.post("/:date/add-food", async (req, res) => {
  const { date } = req.params;
  const { list } = req.query;
  try {
    const options = { upsert: true };

    await DiaryModel.findOneAndUpdate(
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
});

/** @Route @access @desc */
/** @Route @access @desc */

module.exports = router;
