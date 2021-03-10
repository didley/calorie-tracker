import { Router } from "express";
const router = Router();
import controllers from "./food.controllers";
import { roleAuth } from "../../utils/roleAuth";
import { minAdminRoles, minBasicRoles } from "../../utils/roleAuth/ROLES";

// /api/food/
router
  .route("/")
  .get(roleAuth(minBasicRoles), controllers.getDBFoods)
  .post(roleAuth(minAdminRoles), controllers.addDBFood);

// /api/food/my-foods
router
  .all(roleAuth(minBasicRoles))
  .route("/my-foods")
  .get(controllers.getUsersFoods)
  .post(controllers.addUserFood);

router.put("/my-foods/:id", controllers.updateUserFood);
router.delete("/my-foods/:ids", controllers.deleteUserFood);

export default router;
