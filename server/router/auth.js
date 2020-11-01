const router = require("express").Router();
const authHandlers = require("../handlers/auth");
const passport = require("../passport");

router.get("/user", authHandlers.getUserDetails);
router.post("/login", passport.authenticate("local"), authHandlers.loginUser);
router.post("/logout", authHandlers.logoutUser);
router.post("/register", authHandlers.registerUser);

module.exports = router;
