const Food = require("../models/Food");

module.exports = {
  async getDBFoods(req, res) {
    try {
      const DBFoods = await Food.find({}); // TODO: replace with { createdBy: "admin" } after implementing admins
      res.json(DBFoods);
    } catch (err) {
      res.status(400).json({ msg: "Something went wrong", err });
    }
  },
  async getUsersFoods(req, res) {
    try {
      const usersFoods = await Food.find({ createdBy: req.user._id });
      res.json(usersFoods);
    } catch (err) {
      res.status(400).json({ msg: "Something went wrong", err });
    }
  },
  async addDBFood(req, res) {
    try {
      const food = await Food.create({ ...req.body, createdBy: "admin" });
      res.json({ msg: `${food.name} Added to foods database` });
    } catch (err) {
      res.status(400).json({ msg: "Something went wrong", err });
    }
  },
  async addUserFood(req, res) {
    try {
      const food = await Food.create({ ...req.body, createdBy: req.user._id });
      res.json({ msg: `${food.name} Added to your foods` });
    } catch (err) {
      res.status(400).json({ msg: "Something went wrong", err });
    }
  },
};
