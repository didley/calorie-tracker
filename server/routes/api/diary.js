const express = require("express");
const router = express.Router();

const DiaryModel = require("../../models/Diary");
const FoodModel = require("../../models/Food");

/** @Route GET api/diary @access private @desc get diary entry form today */
router.get("/", async (req, res) => {
  try {
    const today = new Date();
    const diaryEntry = await DiaryModel.findOne({ date: today }); // TODO: working on
    res.send("Diary route");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/** @Route GET api/diary/:date @access private @desc get diary entry form param date */
/** @Route GET api/diary/add @access private @desc get food DB list */
/** @Route GET api/diary/add?q=my-foods @access private @desc get users food list */
/** @Route GET api/diary/add?q=recent @access private @desc get users recent food list */

/** @Route @access @desc */
/** @Route @access @desc */

module.exports = router;
