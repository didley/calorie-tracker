import { useQuery, useMutation, queryCache } from "react-query";

import {
  getDiaryEntryByDate,
  addFoodToEntryList,
  updateDiaryEntry,
  removeFoodsByIds,
} from "api/diary";

function useDiaryEntry(date) {
  return useQuery(["entry", date], () => getDiaryEntryByDate(date));
}

function useAddFood() {
  return useMutation((data) => addFoodToEntryList(data));
}

function useUpdateEntry() {
  // To move from Diary component
}

function useRemoveFoods() {
  return useMutation((ids) => removeFoodsByIds(ids));
}
export { useDiaryEntry, useAddFood, useUpdateEntry, useRemoveFoods };
