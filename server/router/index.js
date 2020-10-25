const router = require("express").Router();

router.use("/diary", require("./diary"));
router.use("/foods", require("./foods"));
router.use("/user", require("./user"));

module.exports = router;
