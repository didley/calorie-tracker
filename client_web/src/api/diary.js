import { client } from "./client";

function getDiaryEntry(date) {
  return client.get(`/diary/${date}`);
}

function removeDiaryItems(selectedDate, selectedItems) {
  return client.post(`/diary/${selectedDate}/delete-food`, {
    selectedItems,
  });
}

export { getDiaryEntry, removeDiaryItems };
