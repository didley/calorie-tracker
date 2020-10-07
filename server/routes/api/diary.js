import express from "express";
const router = express.Router();

import DiaryModel from "../../models/Diary";
import FoodModel from "../../models/Food";

/** @Route GET api/diary @access private @desc get diary entry form today */
router.get("/", async (req, res) => {
  try {
    const diaryEntry = await DiaryModel.findOne({ date: new Date() }); // TODO: working on
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
  res.send("Diary route");
});

/** @Route GET api/diary/:date @access private @desc get diary entry form param date */

/** @Route GET api/diary/add @access private @desc get food DB list */
/** @Route GET api/diary/add?q=my-foods @access private @desc get users food list */
/** @Route GET api/diary/add?q=recent @access private @desc get users recent food list */

/** @Route @access @desc */
/** @Route @access @desc */
/** @Route @access @desc */
/** @Route @access @desc */
/** @Route @access @desc */

export default router;
