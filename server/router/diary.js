const router = require("express").Router();
const diaryHandlers = require("../handlers/diary");

router.get(["/", "/:date"], diaryHandlers.getDiaryEntry);
router.post("/:date/add-food", diaryHandlers.addFoodToEntryList);
router.delete("/:date/delete-food/:id", diaryHandlers.removeFoodFromEntry);

module.exports = router;
