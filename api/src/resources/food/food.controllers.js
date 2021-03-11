import { UserFood, DbFood } from "./food.model";

export default {
  getDBFoods: async (req, res) => {
    const PAGE_LIMIT = 20;
    const pageQuery = req.query.page || 1;

    const MAX_QS_LENGTH = 25;
    const queryString = req.query.q;
    const trimmedQS = queryString?.substring(0, MAX_QS_LENGTH);

    try {
      const { docs, hasNextPage, page } = await DbFood.paginate(
        {
          isDeleted: false,
          ...(queryString
            ? {
                $and: [
                  {
                    $or: [
                      { name: { $regex: trimmedQS, $options: "i" } },
                      { brand: { $regex: trimmedQS, $options: "i" } },
                    ],
                  },
                ],
              }
            : {}),
        },
        { page: pageQuery, limit: PAGE_LIMIT, lean: true }
      );

      res.json({ data: docs, hasNextPage, page });
    } catch (err) {
      res.status(400).json({ msg: "Something went wrong", err });
    }
  },
  getUsersFoods: async (req, res) => {
    const PAGE_LIMIT = 20;
    const pageQuery = req.query.page || 1;

    const MAX_QS_LENGTH = 25;
    const queryString = req.query.q;
    const trimmedQS = queryString?.substring(0, MAX_QS_LENGTH);

    try {
      const { docs, hasNextPage, page } = await UserFood.paginate(
        {
          createdBy: req.user._id,
          isDeleted: false,
          ...(queryString
            ? {
                $and: [
                  {
                    $or: [
                      { name: { $regex: trimmedQS, $options: "i" } },
                      { brand: { $regex: trimmedQS, $options: "i" } },
                    ],
                  },
                ],
              }
            : {}),
        },
        { page: pageQuery, limit: PAGE_LIMIT, lean: true }
      );

      res.json({ data: docs, hasNextPage, page });
    } catch (err) {
      res.status(400).json({ msg: "Something went wrong", err });
    }
  },
  addDBFood: async (req, res) => {
    try {
      const data = await DbFood.create({ ...req.body });
      res.json({ data, msg: `${data.name} Added to foods database` });
    } catch (err) {
      res.status(400).json({ msg: "Something went wrong", err });
    }
  },
  addUserFood: async (req, res) => {
    try {
      const data = await UserFood.create({
        ...req.body,
        createdBy: req.user._id,
      });
      res.json({ data, msg: `${data.name} Added to your foods` });
    } catch (err) {
      res.status(400).json({ msg: "Something went wrong", err });
    }
  },
  updateDBFood: async (req, res) => {
    const { id } = req.params;

    try {
      const data = await DbFood.findOneAndUpdate({ _id: id }, req.body, {
        runValidators: true,
        new: true,
      });

      res.json({ data, msg: `${data.name} updated` });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  updateUserFood: async (req, res) => {
    const { id } = req.params;

    try {
      const data = await UserFood.findOneAndUpdate(
        { createdBy: req.user._id, _id: id },
        req.body,
        { runValidators: true, new: true }
      );

      res.json({ data, msg: `${data.name} updated` });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  deleteDBFood: async (req, res) => {
    const { ids } = req.params;

    try {
      const idsArray = ids.split(",");
      await DbFood.updateMany(
        {
          _id: { $in: idsArray },
        },
        { isDeleted: true }
      );

      res.status(200).json({ msg: "Foods deleted" });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  deleteUserFood: async (req, res) => {
    const { ids } = req.params;

    try {
      const idsArray = ids.split(",");
      await UserFood.updateMany(
        {
          createdBy: req.user._id,
          _id: { $in: idsArray },
        },
        { isDeleted: true }
      );

      res.status(200).json({ msg: "Foods deleted" });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
};
