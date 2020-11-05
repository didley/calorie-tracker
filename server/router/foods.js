const router = require("express").Router();
const foodHandlers = require("../handlers/foods");

router.get("/", foodHandlers.getDBFoods);
router.get("/my-foods", foodHandlers.getUsersFoods);
router.post("/", foodHandlers.addDBFood);
router.post("/my-foods", foodHandlers.addUserFood);

module.exports = router;
