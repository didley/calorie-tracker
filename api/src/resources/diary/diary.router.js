import { Router } from "express";
const router = Router();
import controllers from "./diary.controllers";

router.get(["/", "/:date"], controllers.getDiaryEntry);
router.post("/:date/add-food", controllers.addFoodToEntryList);
router.post("/:date/delete-food", controllers.removeSelectedFoodsFromEntry);

export default router;
