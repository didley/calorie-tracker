const router = require("express").Router();
const userHandlers = require("../handlers/user");

router.post("/register", userHandlers.registerUser);
router.post("/login", userHandlers.loginUser);
// router.post("/logout", userHandlers.logoutUser);
// router.post("/deleteUser", userHandlers.deleteUser);

module.exports = router;
