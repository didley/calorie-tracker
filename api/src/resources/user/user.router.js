import { Router } from "express";
const router = Router();
import controllers from "./user.controllers";

// /api/user
router
  .route("/")
  .get(controllers.getUserDetails)
  .put(controllers.updateUser)
  .delete(controllers.deleteUser);
// /api/user/login
router.post("/login", controllers.loginUser);
router.post("/logout", controllers.logoutUser);
router.post("/register", controllers.registerUser);
router.post("/guest", controllers.createGuestUser);

export default router;
