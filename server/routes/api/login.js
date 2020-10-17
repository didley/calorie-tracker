const express = require("express");
const router = express.Router();

var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);

/** @Route GET api/login @access private @desc get get user */
router.get("/", async (req, res) => {
  // TODO get user if logged in
});

/** @Route POST api/login @access public @desc authenticate user */
router.post("/", async (req, res) => {
  //TODO: WORKING ON
  passport.authenticate("local", {
    successRedirect: "/diary",
    failureRedirect: "/login",
    failureFlash: true,
  });
});

module.exports = router;
