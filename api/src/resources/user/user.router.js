import { Router } from "express";
const router = Router();
import controllers from "./user.controllers";

// /api/user
router.get("/", controllers.getUserDetails);
// /api/user/login
router.post("/login", controllers.loginUser);
router.post("/logout", controllers.logoutUser);
router.post("/register", controllers.registerUser);

export default router;
