import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useSessionStorage } from "hooks/useSessionStorage";
import { useAuth } from "hooks/useAuth";

import {
  getDiaryEntryByDate,
  addFoodToEntryList,
  updateDiaryEntry,
  removeFoodsByIds,
} from "api/diary";

function useDiaryEntry(date) {
  const { user } = useAuth();
  // Local state used for react sortable as does not work with react-query state
  const [eatenList, setEatenList] = React.useState([]);
  const [toEatList, setToEatList] = React.useState([]);

  const [sessionEntry, setSessionEntry] = useSessionStorage(`entry-${date}`, {
    eaten: [],
    toEat: [],
    note: "",
  });

  const isGuestUser = user.role === "guest" ? true : false;

  const serverQuery = useQuery(
    ["entry", date],
    () => getDiaryEntryByDate(date),
    {
      enabled: !isGuestUser,
      onSuccess: (response) => {
        setEatenList(response.eaten);
        setToEatList(response.toEat);
      },
    }
  );

  // replicates return value of react-query useQuery
  const sessionQuery = { data: sessionEntry, isLoading: false };

  let query;
  if (user.role === "guest") {
    query = sessionQuery;
  } else {
    query = serverQuery;
  }

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

function useUpdateEntry(date) {
  const { user } = useAuth();

  const queryClient = useQueryClient();
  const serverMutator = useMutation(updateDiaryEntry, {
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

  const useSessionMutation = () => {
    const [sessionEntry, setSessionEntry] = useSessionStorage(`entry-${date}`, {
      eaten: [],
      toEat: [],
      note: "",
    });

    // !working on : below not working (mutate not a fn), and newSessionEntries not spreading correctly

    const mutate = ({ date, updates }) => {
      sessionEntry.note = updates.note;
      setSessionEntry({ ...sessionEntry });
    };

    return { mutate };
  };

  const sessionMutator = useSessionMutation();

  let mutator;
  user.role === "guest"
    ? (mutator = sessionMutator)
    : (mutator = serverMutator);

  return mutator;
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
