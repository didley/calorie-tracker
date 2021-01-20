import { Router } from "express";
const router = Router();
import controllers from "./diary.controllers";

router
  .route("/:date")
  .get(controllers.getDiaryEntryByDate)
  .post(controllers.addFoodToEntryList)
  .patch(controllers.updateDiaryEntry);

router.delete("/:date/:ids", controllers.removeFoodsByIds);

export default router;
