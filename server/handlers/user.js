const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

module.exports = {
  registerUser: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const alreadyUser = await User.findOne({ email });
      if (alreadyUser) {
        return res.status(400).json({ msg: "email already in use" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });
      res.json({ userId: user.id, msg: "Account created" });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  getUser: async (req, res) => {
    console.log("inside GET /login callback fn");
    console.log(req.sessionID);
    res.send("YOU got the login page");
  },
  loginUser: (req, res) => {
    res.send("login worked implement redirect here");

    // // Without passport
    // const { email, password } = req.body;
    // try {
    //   const user = await User.findOne({ email });

    //   if (!user) {
    //     return res.json({ msg: "Account not found" });
    //   }

    //   const correctPassword = await bcrypt.compare(password, user.password);

    //   if (!correctPassword) {
    //     return res.json({ msg: "Incorrect credentials" });
    //   }

    //   res.json({ userId: user.id, msg: "Successful login, welcome!" });
    // } catch (err) {
    //   res.status(400).json(err);
    // }
  },
  authRequired: (req, res) => {
    console.log("Inside GET /authrequired callback");
    console.log(`User authenticated? ${req.isAuthenticated()}`);
    if (req.isAuthenticated()) {
      res.send("you hit the authentication endpoint\n");
    } else {
      res.redirect("/");
    }
  },
  logoutUser: "TODO",
  deleteUser: "TODO",
};
