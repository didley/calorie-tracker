import { Food } from "./food.model";

export default {
  getDBFoods: async (req, res) => {
    try {
      const DBFoods = await Food.find({}).lean(); // TODO: replace with { createdBy: "admin" } after implementing admins
      res.json(DBFoods);
    } catch (err) {
      res.status(400).json({ msg: "Something went wrong", err });
    }
  },
  getUsersFoods: async (req, res) => {
    try {
      const usersFoods = await Food.find({ createdBy: req.user._id }).lean();
      res.json(usersFoods);
    } catch (err) {
      res.status(400).json({ msg: "Something went wrong", err });
    }
  },
  addDBFood: async (req, res) => {
    try {
      const food = await Food.create({ ...req.body, createdBy: "admin" });
      res.json({ msg: `${food.name} Added to foods database` });
    } catch (err) {
      res.status(400).json({ msg: "Something went wrong", err });
    }
  },
  addUserFood: async (req, res) => {
    try {
      const food = await Food.create({ ...req.body, createdBy: req.user._id });
      res.json({ msg: `${food.name} Added to your foods` });
    } catch (err) {
      res.status(400).json({ msg: "Something went wrong", err });
    }
  },
  updateDBFood: async (req, res) => {
    // TODO
  },
  updateUserFood: async (req, res) => {
    const { id } = req.params;

    try {
      await Food.findOneAndUpdate(
        { createdBy: req.user._id, _id: id },
        req.body,
        { runValidators: true }
      );

      res.status(200).json({ msg: "Food updated" });
    } catch (err) {
      res.json({ err });
    }
  },
  deleteDBFood: async (req, res) => {
    // TODO
  },
  deleteUserFood: async (req, res) => {
    const { ids } = req.params;

    try {
      const idsArray = ids.split(",");
      await Food.deleteMany({
        createdBy: req.user._id,
        _id: { $in: idsArray },
      });

      res.status(200).json({ msg: "Foods deleted" });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
};
