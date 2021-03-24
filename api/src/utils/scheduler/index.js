import Agenda from "agenda";
import { dbURI } from "../getDbURI";
import { Guest } from "../../resources/user/user.model";
import { Food } from "../../resources/food/food.model";
import { Diary } from "../../resources/diary/diary.model";

import mongoose from "mongoose";

const agenda = new Agenda();
const dbName = "calorie-tracker";

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: false,
    dbName: dbName,
  })
  .then(() => agenda.mongo(mongoose.connection.db));

agenda.define("delete old guests", async () => {
  const dateNow = Date.now();
  const msPerMinute = 1000 * 60;
  const oneMinuteAgo = dateNow - msPerMinute;

  console.log("delete old guests ran");
  try {
    const guestsToDelete = await Guest.find(
      {
        createdAt: { $lt: new Date(oneMinuteAgo) },
      },
      "_id"
    );
    const guestIds = guestsToDelete.map(({ _id }) => _id);
    if (!guestIds) return;
    await Food.deleteMany({ createdBy: { $in: guestIds } });
    await Diary.deleteMany({ userId: { $in: guestIds } });
    await Guest.deleteMany({ _id: { $in: guestIds } });
  } catch (err) {
    console.error("Agenda delete old guests error", err);
  }
});

(async function () {
  await agenda.start();

  await agenda.every("5 seconds", "delete old guests");
})();
