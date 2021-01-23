import { client } from "./client";

function getDiaryEntryByDate(date) {
  return client.get(`/diary/${date}`);
}

function addFoodToEntryList({ date, listName, items }) {
  return client.post(`/diary/${date}`, { body: { listName, items } });
}

function updateDiaryEntry(date, updates) {
  return client.patch(`/diary/${date}`, { body: updates });
}

function removeFoodsByIds(date, selectedIds) {
  return client.delete(`/diary/${date}/${selectedIds}`);
}

export {
  getDiaryEntryByDate,
  addFoodToEntryList,
  updateDiaryEntry,
  removeFoodsByIds,
};
