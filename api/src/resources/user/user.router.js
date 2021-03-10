import { Router } from "express";
const router = Router();
import controllers from "./user.controllers";
import { roleAuth } from "../../utils/roleAuth";
import { minBasicRoles } from "../../utils/roleAuth/ROLES";

// /api/user
router
  .route("/")
  .get(roleAuth(minBasicRoles), controllers.getUserDetails)
  .put(roleAuth(minBasicRoles), controllers.updateUser)
  .delete(roleAuth(minBasicRoles), controllers.deleteUser);
// /api/user/login
router.post("/login", controllers.loginUser);
router.post("/logout", controllers.logoutUser);
router.post("/register", controllers.registerUser);

export default router;
