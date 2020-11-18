const router = require("express").Router();
const userHandlers = require("../handlers/user");
const passport = require("passport");

// route eg. /api/user/login
router.post("/register", userHandlers.registerUser);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/api/diary",
    failureRedirect: "/api/user/login",
  }),
  userHandlers.loginUser
);
router.get("/login", (req, res) => {
  res.send("login page would show");
});
router.get("/authrequired", userHandlers.authRequired);

// router.post("/logout", userHandlers.logoutUser);
// router.post("/deleteUser", userHandlers.deleteUser);

module.exports = router;
