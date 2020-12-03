const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require("../passport");

module.exports = {
  getUserDetails(req, res) {
    if (req.user) {
      // return res.json({ user: req.user });
      const { password, ...cleanUser } = req.user._doc;
      console.log({ cleanUser });
      return res.json({ user: cleanUser });
    } else {
      return res.json({ user: null });
    }
  },
  loginUser(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ msg: info.message });
      req.logIn(user, (err) => {
        if (err) return next(err);
        console.log("Login success");
        return res.json({ msg: `Welcome ${req.user.name}` });
      });
    })(req, res, next);
  },
  logoutUser(req, res) {
    if (req.user) {
      req.logout();
      req.session.destroy();
      res.clearCookie("connect.sid");
      return res.json({ msg: "logging you out" });
    } else {
      return res.json({ msg: "no user to log out!" });
    }
  },
  async registerUser(req, res) {
    //TODO - Add validation
    try {
      const { name, email, password } = req.body;
      const alreadyUser = await User.findOne({ email });
      if (alreadyUser) {
        return res.status(401).json({ msg: "Email already in use" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({ name, email, password: hashedPassword }).then(
        (user) => {
          req.login();
          const { password, ...cleanUser } = user._doc;
          res.json({ user: cleanUser, msg: "Account created" });
        }
      );
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
