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
  const isGuestUser = user.role === "guest" ? true : false;
  // Local state used for react sortable as does not work with react-query state
  const [eatenList, setEatenList] = React.useState([]);
  const [toEatList, setToEatList] = React.useState([]);

  // replicates return value of react-query useQuery
  const useSessionQuery = () => {
    const [sessionEntry, setSessionEntry] = useSessionStorage(`entry-${date}`, {
      eaten: [],
      toEat: [],
      note: "",
    });

    React.useEffect(() => {
      if (isGuestUser) {
        setEatenList(sessionEntry.eaten);
        setToEatList(sessionEntry.toEat);
      }
    }, [sessionEntry.eaten, sessionEntry.toEat]);

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
        setEatenList(response.eaten);
        setToEatList(response.toEat);
      },
    }
  );

  console.log({ sessionQuery, serverQuery });

  let query;
  if (isGuestUser) query = sessionQuery;
  else query = serverQuery;

  return [query, { eatenList, setEatenList, toEatList, setToEatList }];
}

function useAddFood(date) {
  const { user } = useAuth();
  const isGuestUser = user.role === "guest" ? true : false;

  const useSessionMutation = (date) => {
    const [sessionEntry, setSessionEntry] = useSessionStorage(`entry-${date}`, {
      eaten: [],
      toEat: [],
      note: "",
    });

    const mutate = (params) => {
      const { listName, items } = params;
      console.log({ params });
      sessionEntry[listName] = [...sessionEntry[listName], items];

      setSessionEntry({ ...sessionEntry });
    };
    return { mutate };
  };
  const sessionMutator = useSessionMutation(date);

  const queryClient = useQueryClient();
  const serverMutator = useMutation(addFoodToEntryList, {
    enabled: !isGuestUser,
    onSuccess: (_response, variables) => {
      queryClient.invalidateQueries(["entry", variables.date]);
    },
  });

  let mutator;
  isGuestUser ? (mutator = sessionMutator) : (mutator = serverMutator);

  return mutator;
}

function useUpdateEntry(date) {
  const { user } = useAuth();
  const isGuestUser = user.role === "guest" ? true : false;

  const queryClient = useQueryClient();
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
    const [sessionEntry, setSessionEntry] = useSessionStorage(`entry-${date}`, {
      eaten: [],
      toEat: [],
      note: "",
    });

    const mutate = ({ updates }) => {
      sessionEntry.note = updates.note;

      setSessionEntry({ ...sessionEntry });
    };
    return { mutate };
  };
  const sessionMutator = useSessionMutation();

  let mutator;
  isGuestUser ? (mutator = sessionMutator) : (mutator = serverMutator);

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
