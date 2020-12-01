const bcrypt = require("bcryptjs");
const User = require("../models/User");

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
  // auth handled with passport middleware within router
  loginUser(req, res) {
    console.log("POST to /login");
    const { password, ...cleanUser } = req.user._doc;
    return res.json({ user: cleanUser });
  },
  logoutUser(req, res) {
    if (req.user) {
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
          const { password, ...cleanUser } = user._doc;
          res.json({ user: cleanUser, msg: "Account created" });
        }
      );
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
