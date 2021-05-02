import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { useAuth } from "hooks/useAuth";

import { defaultUserFood } from "./defaultSessionData";

import {
  getDBFoods,
  getUsersFoods,
  addDBFood,
  addUserFood,
  updateDBFood,
  updateUserFood,
  deleteDBFood,
  deleteUserFood,
} from "api/food";

function useGetDBFoods(searchQuery) {
  const { user } = useAuth();
  const isGuestUser = user.role === "guest" ? true : false;

  return useInfiniteQuery(
    ["dbFoods", searchQuery],
    ({ pageParam = 1 }) => getDBFoods(pageParam, searchQuery),
    {
      enabled: !isGuestUser,
      getNextPageParam: (lastPage, _allPages) => {
        if (!lastPage.hasNextPage) return;
        return lastPage.page + 1;
      },
    }
  );
}

function useGetUsersFoods(searchQuery) {
  const { user } = useAuth();
  const isGuestUser = user.role === "guest" ? true : false;

  // replicates react-query {useInfiniteQuery} API
  const useSessionQuery = () => {
    const fetchNextPage = () => {
      return;
    };

    return {
      fetchNextPage,
      data: { pages: [{ data: defaultUserFood, hasNextPage: false, page: 1 }] },
      isLoading: false,
      isFetchingNextPage: false,
    };
  };

  const sessionQuery = useSessionQuery();

  const serverQuery = useInfiniteQuery(
    ["userFoods", searchQuery],
    ({ pageParam = 1 }) => getUsersFoods(pageParam, searchQuery),
    {
      enabled: !isGuestUser,
      getNextPageParam: (lastPage, _allPages) => {
        if (!lastPage.hasNextPage) return;
        return lastPage.page + 1;
      },
    }
  );

  let query;
  if (isGuestUser) query = sessionQuery;
  else query = serverQuery;

  return query;
}

function useAddDBFood() {
  const queryClient = useQueryClient();
  return useMutation(addDBFood, {
    onSuccess: () => {
      queryClient.invalidateQueries(["dbFoods"]);
    },
  });
}

function useAddUserFood() {
  const queryClient = useQueryClient();
  return useMutation(addUserFood, {
    onSuccess: () => {
      queryClient.invalidateQueries(["userFoods"]);
    },
  });
}

function useUpdateDBFood() {
  const queryClient = useQueryClient();
  return useMutation(updateDBFood, {
    onSuccess: () => {
      queryClient.invalidateQueries(["dbFoods"]);
    },
  });
}

function useUpdateUserFood() {
  const queryClient = useQueryClient();
  return useMutation(updateUserFood, {
    onSuccess: () => {
      queryClient.invalidateQueries(["userFoods"]);
    },
  });
}

function useDeleteDBFood() {
  const queryClient = useQueryClient();
  return useMutation(deleteDBFood, {
    onSuccess: () => {
      queryClient.invalidateQueries(["dbFoods"]);
    },
  });
}

function useDeleteUserFood() {
  const queryClient = useQueryClient();
  return useMutation(deleteUserFood, {
    onSuccess: () => {
      queryClient.invalidateQueries(["userFoods"]);
    },
  });
}

export {
  useGetDBFoods,
  useGetUsersFoods,
  useAddDBFood,
  useAddUserFood,
  useUpdateDBFood,
  useUpdateUserFood,
  useDeleteDBFood,
  useDeleteUserFood,
};
