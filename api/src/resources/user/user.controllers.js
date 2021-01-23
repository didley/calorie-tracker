import passport from "../../utils/passport";
import { User } from "./user.model";
import validator from "validator";

export default {
  getUserDetails: (req, res) => {
    if (req.user) {
      const { password, ...cleanUser } = req.user._doc;
      console.log({ cleanUser });
      return res.json({ user: cleanUser });
    } else {
      return res.json({ user: null });
    }
  },
  loginUser: (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ msg: info.message });
      req.logIn(user, (err) => {
        if (err) return next(err);
        const { password, ...cleanUser } = req.user._doc;
        return res.json({ user: cleanUser, msg: `Welcome ${req.user.name}` });
      });
    })(req, res, next);
  },
  logoutUser: (req, res) => {
    if (req.user) {
      req.logout();
      req.session.destroy((err) => {
        if (err) {
          res
            .status(400)
            .json({ msg: `Error logging you out: ${err.message}` });
        }
        res.clearCookie("connect.sid").json({ msg: "Logged out successfully" });
      });
    } else {
      res.json({ msg: "No user to log out" });
    }
  },
  registerUser: async (req, res) => {
    //TODO - Add validation
    try {
      const { name, email, password, country } = req.body;
      const alreadyUser = await User.findOne({ email });
      if (alreadyUser) {
        return res.status(401).json({ msg: "Email already in use" });
      }

      await User.create({ name, email, password, country }).then((user) => {
        req.login(user, (err) => {
          if (err) throw err;

          const { password, ...cleanUser } = user._doc;
          res.json({ user: cleanUser, msg: `Welcome ${req.user.name}` });
        });
      });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  updateUser: async (req, res) => {
    // const updatedUser = await User.findOne({ _id: req.user._id });
    // res.json({ updatedUser });

    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.user._id },
        req.body,
        { new: true, runValidators: true }
      )
        .lean()
        .exec();

      const { password, ...cleanUser } = updatedUser;
      res.json({ data: cleanUser });
    } catch (err) {
      res.status(400).json({ err, msg: "failed to update account" });
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.deleteOne({ _id: req.user._id });
      res.send();
    } catch (err) {
      res.status(400).send();
    }
  },
};
