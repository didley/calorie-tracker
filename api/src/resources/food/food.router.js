import { Router } from "express";
const router = Router();
import controllers from "./food.controllers";

router.get("/", controllers.getDBFoods);
router.get("/my-foods", controllers.getUsersFoods);
router.post("/", controllers.addDBFood);
router.post("/my-foods", controllers.addUserFood);

export default router;
