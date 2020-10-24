const router = require("express").Router();
const bcrypt = require("bcryptjs");

const User = require("../../models/User");

/** @Route POST api/register @access public @desc register user */
router.post("/", async (req, res) => {
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
    res.json(err);
  }
});

module.exports = router;
