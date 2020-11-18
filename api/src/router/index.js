const router = require("express").Router();

router.use("/diary", require("./diary"));
router.use("/foods", require("./foods"));
router.use("/auth", require("./auth"));

module.exports = router;
