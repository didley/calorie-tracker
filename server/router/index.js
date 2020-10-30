const router = require("express").Router();

router.use("/diary", require("./diary"));
router.use("/foods", require("./foods"));
router.use("/user", require("./user"));
router.use("/auth", require("./auth"));

module.exports = router;
