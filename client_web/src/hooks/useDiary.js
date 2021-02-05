import { useQuery, useMutation, useQueryClient } from "react-query";

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
  const queryClient = useQueryClient();
  return useMutation(addFoodToEntryList, {
    onSuccess: (_response, variables) => {
      queryClient.invalidateQueries(["entry", variables.date]);
    },
  });
}

function useUpdateEntry() {
  // To move from Diary component
}

function useRemoveFoods() {
  const queryClient = useQueryClient();
  return useMutation(removeFoodsByIds, {
    onSuccess: (_response, variables) => {
      queryClient.invalidateQueries(["entry", variables.date]);
    },
  });
}
export { useDiaryEntry, useAddFood, useUpdateEntry, useRemoveFoods };
