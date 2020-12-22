import { Router } from "express";
const router = Router();
import controllers from "./user.controllers";

router.get("/user", controllers.getUserDetails);
router.post("/login", controllers.loginUser);
router.post("/logout", controllers.logoutUser);
router.post("/register", controllers.registerUser);

export default router;
