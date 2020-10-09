const express = require("express");
const router = express.Router();

const DiaryModel = require("../../models/Diary");
const FoodModel = require("../../models/Food");

/** @Route GET api/diary @access private @desc get diary entry form today */
router.get("/", async (req, res) => {
  try {
    const today = new Date();
    const diaryEntry = await DiaryModel.findOne({ date: today });
    res.send("Diary route");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/** @Route GET api/diary/:date @access private @desc get diary entry form param date */
router.get("/:date", async (req, res) => {
  try {
    const diaryEntry = await DiaryModel.findOne({ date: req.query.date });
    res.send("Diary route");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/** @Route POST api/diary/:date/add-food @access private @desc add food to diary list */
router.post("/:date/add-food", async (req, res) => {
  //TODO: working on
  try {
    const { date } = req.params;
    const { list } = req.query;
    const options = { upsert: true };

    await DiaryModel.findOneAndUpdate(
      { date },
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
