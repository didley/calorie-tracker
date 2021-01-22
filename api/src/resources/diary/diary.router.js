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

// Diary routes

// /diary/:date/
// - GET
// get diary entry
// - POST
// add food to list {listName, foodsWithChoices}
// copy food to entry {listName, foodsWithChoices}
// - PATCH
// update chosen food amounts {chosenFood}
// move food index {list}
// update note {note}

// /diary/:date/:chosenFoodIds
// - DELETE
// remove foods by IDs from lists [arrayOfChosenFoodIDs]
// move food to other entry w/POST
