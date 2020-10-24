const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");

/** @Route POST api/login @access public @desc authenticate user */
router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/api/diary",
    failureRedirect: "/api/login",
  })
);

router.post("/test", async (req, res) => {
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
    res.json(err);
  }
});

module.exports = router;
