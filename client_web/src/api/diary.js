import { client } from "./client";
import { v4 as uuidv4 } from "uuid";
import {
  getValueFromSessionStorage,
  saveValueToSessionStorage,
} from "utils/sessionStorage";
import { guestUser } from "utils/isGuestUser";

function getDiaryEntryByDate(date) {
  if (guestUser.get()) {
    return getValueFromSessionStorage(`entry-${date}`, {
      eaten: [],
      toEat: [],
      note: "",
    });
  }

  return client.get(`/diary/${date}`);
}

function addFoodToEntryList({ date, listName, items }) {
  if (guestUser.get()) {
    const diaryEntry = getValueFromSessionStorage(`entry-${date}`, {
      eaten: [],
      toEat: [],
      note: "",
    });

    const itemsWithIds = items.map((item) => ({ ...item, _id: uuidv4() }));

    diaryEntry[listName] = [...diaryEntry[listName], ...itemsWithIds];
    saveValueToSessionStorage(`entry-${date}`, diaryEntry);

    return { msg: "Food added" };
  }

  return client.post(`/diary/${date}`, { body: { listName, items } });
}

function updateDiaryEntry({ date, updates }) {
  if (guestUser.get()) {
    const diaryEntry = getValueFromSessionStorage(`entry-${date}`, {
      eaten: [],
      toEat: [],
      note: "",
    });

    const updatedEntry = { ...diaryEntry, ...updates };

    saveValueToSessionStorage(`entry-${date}`, updatedEntry);
    return { msg: "Diary updated" };
  }

  return client.patch(`/diary/${date}`, { body: updates });
}

function removeFoodsByIds({ date, selectedIds }) {
  if (guestUser.get()) {
    const diaryEntry = getValueFromSessionStorage(`entry-${date}`, {
      eaten: [],
      toEat: [],
      note: "",
    });

    const eatenFiltered = diaryEntry.eaten.filter(
      (item) => !selectedIds.includes(item._id)
    );
    const toEatFiltered = diaryEntry.toEat.filter(
      (item) => !selectedIds.includes(item._id)
    );

    const newEntry = {
      eaten: eatenFiltered,
      toEat: toEatFiltered,
      note: diaryEntry.note,
    };

    saveValueToSessionStorage(`entry-${date}`, newEntry);
    return { msg: "Foods removed" };
  }

  return client.delete(`/diary/${date}/${selectedIds}`);
}

export {
  getDiaryEntryByDate,
  addFoodToEntryList,
  updateDiaryEntry,
  removeFoodsByIds,
};
