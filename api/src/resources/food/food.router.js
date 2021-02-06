import { Router } from "express";
const router = Router();
import controllers from "./food.controllers";

// /api/food/
router.route("/").get(controllers.getDBFoods).post(controllers.addDBFood);

// /api/food/my-foods
router
  .route("/my-foods")
  .get(controllers.getUsersFoods)
  .post(controllers.addUserFood);

router.put("/my-foods/:id", controllers.updateUserFood);
router.delete("/my-foods/:ids", controllers.deleteUserFood);

export default router;
