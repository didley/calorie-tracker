import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";

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
  return useInfiniteQuery(
    ["dbFoods", searchQuery],
    ({ pageParam = 1 }) => getDBFoods(pageParam, searchQuery),
    {
      getNextPageParam: (lastPage, _allPages) => {
        if (!lastPage.hasNextPage) return;
        return lastPage.page + 1;
      },
    }
  );
}
function useGetUsersFoods(searchQuery) {
  return useInfiniteQuery(
    ["userFoods", searchQuery],
    ({ pageParam = 1 }) => getUsersFoods(pageParam, searchQuery),
    {
      getNextPageParam: (lastPage, _allPages) => {
        if (!lastPage.hasNextPage) return;
        return lastPage.page + 1;
      },
    }
  );
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
