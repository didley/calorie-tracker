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
  const queryClient = useQueryClient();
  return useMutation(updateDiaryEntry, {
    onMutate: async (newData) => {
      await queryClient.cancelQueries(["entry", newData.date]);

      const rollback = queryClient.getQueryData(["entry", newData.date]);

      const { eaten, toEat, note } = newData.updates;
      let updates;
      if (note !== undefined) {
        updates = { note };
      } else {
        updates = { eaten, toEat };
      }

      queryClient.setQueryData(["entry", newData.date], (prev) => ({
        ...prev,
        ...updates,
      }));

      return rollback;
    },
    onError: (_err, newData, rollback) => {
      queryClient.setQueryData(["entry", newData.date], rollback);
    },
    onSettled: (newData, _err) => {
      queryClient.invalidateQueries(["entry", newData.date]);
    },
  });
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
