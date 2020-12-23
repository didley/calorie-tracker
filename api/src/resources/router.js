import { Router } from "express";
const router = Router();

import diaryRouter from "./diary/diary.router";
import foodRouter from "./food/food.router";
import userRouter from "./user/user.router";

router.use("/diary", diaryRouter);
router.use("/foods", foodRouter);
router.use("/user", userRouter);

export default router;
