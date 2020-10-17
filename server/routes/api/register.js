const express = require("express");
const router = express.Router();

const User = require("../../models/User");

/** @Route POST api/register @access public @desc register user */
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "email already in use" });
    }

    user = new User({ name, email, password });

    await user.save();

    res.json({ msg: "Account created" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
