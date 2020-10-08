const express = require("express");
const router = express.Router();

const DiaryModel = require("../../models/Diary");
const Food = require("../../models/Food");
const FoodModel = require("../../models/Food");

/** @Route GET api/foods @access public @desc get foods DB */
router.get("/", async (req, res) => {
  try {
    res.send("foods route");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/** @Route GET api/foods/my-foods @access private @desc get users created foods */
router.get("/my-foods", async (req, res) => {
  try {
    res.send("my-food route");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/** @Route POST api/foods @access private @desc create a users food */
router.post("/", async (req, res) => {
  try {
    const newFood = new FoodModel(req.body);
    const food = await newFood.save();
    res.json(`${food.name} Added to your foods`);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/** @Route @access @desc */
/** @Route @access @desc */

module.exports = router;
