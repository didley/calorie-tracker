import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

import {
  getDiaryEntryByDate,
  addFoodToEntryList,
  updateDiaryEntry,
  removeFoodsByIds,
} from "api/diary";

export const useDiary = (date) => {
  const queryClient = useQueryClient();

  function useDiaryEntry() {
    const [localEatenListState, setLocalEatenListState] = React.useState([]);
    const [localToEatListState, setLocalToEatListState] = React.useState([]);

    const query = useQuery(["entry", date], () => getDiaryEntryByDate(date), {
      onSuccess: (response) => {
        setLocalEatenListState(response.eaten);
        setLocalToEatListState(response.toEat);
      },
    });

    return [
      query,
      {
        eatenList: localEatenListState,
        setEatenList: setLocalEatenListState,
        toEatList: localToEatListState,
        setToEatList: setLocalToEatListState,
      },
    ];
  }

  function useAddFood() {
    return useMutation(addFoodToEntryList, {
      onSuccess: (_response, variables) => {
        queryClient.invalidateQueries(["entry", variables.date]);
      },
    });
  }

  function useUpdateEntry() {
    return useMutation(updateDiaryEntry, {
      onMutate: async (newData) => {
        await queryClient.cancelQueries(["entry", newData.date]);

        const rollback = queryClient.getQueryData(["entry", newData.date]);

        const { eaten, toEat, note } = newData.updates;

        let updates;
        if (note !== undefined) updates = { note };
        else updates = { eaten, toEat };

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
    return useMutation(removeFoodsByIds, {
      onSuccess: (_response, variables) => {
        queryClient.invalidateQueries(["entry", variables.date]);
      },
    });
  }

  return { useDiaryEntry, useAddFood, useUpdateEntry, useRemoveFoods };
};
