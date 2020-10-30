const router = require("express").Router();
const authHandlers = require("../handlers/auth");
const auth = require("../middleware/auth");

router.get("/authenticate", auth, authHandlers.authenticate);
router.get("/read-cookie", authHandlers.readCookie);
router.get("/clear-cookie", authHandlers.clearCookie);

module.exports = router;
