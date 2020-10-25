const Food = require("../models/Food");

module.exports = {
  getAllFoods: async (req, res) => {
    try {
      const allFoods = await Food.find({});
      res.json(allFoods);
    } catch (err) {
      res.status(400).json({ msg: "Something went wrong", err });
    }
  },
  getUsersFoods: async (req, res) => {
    try {
      res.json({ msg: "my-food route" });
    } catch (err) {
      res.status(400).json({ msg: "Something went wrong", err });
    }
  },
  addUserFood: async (req, res) => {
    try {
      const food = await Food.create(req.body);
      res.json({ msg: `${food.name} Added to your foods` });
    } catch (err) {
      res.status(400).json({ msg: "Something went wrong", err });
    }
  },
};
