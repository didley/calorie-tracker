import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

import {
  getDiaryEntryByDate,
  addFoodToEntryList,
  updateDiaryEntry,
  removeFoodsByIds,
} from "api/diary";

function useDiaryEntry(date) {
  const [eatenList, setEatenList] = React.useState([]);
  const [toEatList, setToEatList] = React.useState([]);

  const query = useQuery(["entry", date], () => getDiaryEntryByDate(date), {
    onSuccess: (response) => {
      setEatenList(response.eaten);
      setToEatList(response.toEat);
    },
  });

  return [query, { eatenList, setEatenList, toEatList, setToEatList }];
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
