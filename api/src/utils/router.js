import { Router } from "express";
const router = Router();

import diaryRouter from "../resources/diary/diary.router";
import foodRouter from "../resources/food/food.router";
import userRouter from "../resources/user/user.router";

router.use("/diary", diaryRouter);
router.use("/foods", foodRouter);
router.use("/user", userRouter);

export default router;
