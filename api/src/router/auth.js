const router = require("express").Router();
const authHandlers = require("../handlers/auth");

router.get("/user", authHandlers.getUserDetails);
router.post("/login", authHandlers.loginUser);
router.post("/logout", authHandlers.logoutUser);
router.post("/register", authHandlers.registerUser);

module.exports = router;
