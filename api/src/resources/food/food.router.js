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
router.put("/:id", roleAuth(minAdminRoles), controllers.updateDBFood);
router.delete("/:ids", roleAuth(minAdminRoles), controllers.deleteDBFood);

// /api/food/my-foods
router
  .route("/my-foods")
  .get(controllers.getUsersFoods)
  .post(controllers.addUserFood);
router.put("/my-foods/:id", controllers.updateUserFood);
router.delete("/my-foods/:ids", controllers.deleteUserFood);

export default router;
