const router = require("express").Router();
const foodHandlers = require("../handlers/foods");

router.get("/", foodHandlers.getAllFoods);
router.get("/my-foods", foodHandlers.getUsersFoods);
router.post("/", foodHandlers.addUserFood);

module.exports = router;
