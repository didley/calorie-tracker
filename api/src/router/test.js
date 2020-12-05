const router = require("express").Router();
const testHandlers = require("../handlers/test");

router.get("/", testHandlers.getTest);
router.post("/", testHandlers.postTest);

module.exports = router;
