import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useSessionStorage } from "hooks/useSessionStorage";
import { useAuth } from "hooks/useAuth";
import { v4 as uuidv4 } from "uuid";

import {
  getDiaryEntryByDate,
  addFoodToEntryList,
  updateDiaryEntry,
  removeFoodsByIds,
} from "api/diary";

export const useDiary = (date) => {
  const { isGuestUser } = useAuth();
  const queryClient = useQueryClient();

  const [sessionEntry, setSessionEntry] = useSessionStorage(`entry-${date}`, {
    eaten: [],
    toEat: [],
    note: "",
  });

  const setSessionEaten = (update) =>
    setSessionEntry({ eaten: update, ...sessionEntry });

  const setSessionToEat = (update) =>
    setSessionEntry({ toEat: update, ...sessionEntry });

  function useDiaryEntry() {
    const [localEatenListState, setLocalEatenListState] = React.useState([]);
    const [localToEatListState, setLocalToEatListState] = React.useState([]);

    const useSessionQuery = () => {
      return {
        data: sessionEntry,
        isLoading: false,
        isSuccess: true,
      };
    };
    const sessionQuery = useSessionQuery();

    const serverQuery = useQuery(
      ["entry", date],
      () => getDiaryEntryByDate(date),
      {
        enabled: !isGuestUser,
        onSuccess: (response) => {
          setLocalEatenListState(response.eaten);
          setLocalToEatListState(response.toEat);
        },
      }
    );

    let query;
    let eatenList;
    let toEatList;
    let setEatenList;
    let setToEatList;

    if (isGuestUser) {
      query = sessionQuery;
      eatenList = sessionEntry.eaten;
      toEatList = sessionEntry.toEat;
      setEatenList = setSessionEaten;
      setToEatList = setSessionToEat;
    } else {
      query = serverQuery;
      eatenList = localEatenListState;
      toEatList = localToEatListState;
      setEatenList = setLocalEatenListState;
      setToEatList = setLocalToEatListState;
    }

    return [
      query,
      {
        eatenList,
        setEatenList,
        toEatList,
        setToEatList,
      },
    ];
  }

  function useAddFood() {
    const useSessionMutation = () => {
      const [isSuccess, setIsSuccess] = React.useState(false);

      const mutate = ({ listName, items }) => {
        const itemsWithIds = { ...items, _id: uuidv4() };

        sessionEntry[listName] = [...sessionEntry[listName], itemsWithIds];

        setSessionEntry({ ...sessionEntry });
        setIsSuccess(true);
      };
      return { mutate, isSuccess };
    };
    const sessionMutator = useSessionMutation();

    const serverMutator = useMutation(addFoodToEntryList, {
      enabled: !isGuestUser,
      onSuccess: (_response, variables) => {
        queryClient.invalidateQueries(["entry", variables.date]);
      },
    });

    let mutator;
    if (isGuestUser) mutator = sessionMutator;
    else mutator = serverMutator;

    return mutator;
  }

  function useUpdateEntry() {
    const serverMutator = useMutation(updateDiaryEntry, {
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

    const useSessionMutation = () => {
      const mutate = ({ updates }) => {
        sessionEntry.note = updates.note;

        setSessionEntry({ ...sessionEntry });
      };
      return { mutate };
    };
    const sessionMutator = useSessionMutation();

    let mutator;
    if (isGuestUser) mutator = sessionMutator;
    else mutator = serverMutator;

    return mutator;
  }

  function useRemoveFoods() {
    const useSessionMutation = () => {
      const mutate = ({ selectedIds }) => {
        const eatenFiltered = sessionEntry.eaten.filter(
          (item) => !selectedIds.includes(item._id)
        );
        const toEatFiltered = sessionEntry.toEat.filter(
          (item) => !selectedIds.includes(item._id)
        );

        const newEntry = {
          eaten: eatenFiltered,
          toEat: toEatFiltered,
          note: sessionEntry.note,
        };

        setSessionEntry(newEntry);
      };
      return { mutate };
    };
    const sessionMutator = useSessionMutation();

    const serverMutator = useMutation(removeFoodsByIds, {
      onSuccess: (_response, variables) => {
        queryClient.invalidateQueries(["entry", variables.date]);
      },
    });

    let mutator;
    if (isGuestUser) mutator = sessionMutator;
    else mutator = serverMutator;

    return mutator;
  }

  return { useDiaryEntry, useAddFood, useUpdateEntry, useRemoveFoods };
};
