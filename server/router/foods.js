const router = require("express").Router();
const foodHandlers = require("../handlers/foods");

router.get("/", foodHandlers.getDBFoods);
router.post("/", foodHandlers.addDBFood);
router.get("/my-foods", foodHandlers.getUsersFoods);
router.post("/my-foods", foodHandlers.addUserFood);

module.exports = router;
