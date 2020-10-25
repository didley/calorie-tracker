const User = require("../models/User");
const bcrypt = require("bcryptjs");

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
  loginUser: async (req, res) => {
    // Without passport
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.json({ msg: "Account not found" });
      }

      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) {
        return res.json({ msg: "Incorrect credentials" });
      }

      res.json({ userId: user.id, msg: "Successful login, welcome!" });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  logoutUser: "TODO",
  deleteUser: "TODO",
};
