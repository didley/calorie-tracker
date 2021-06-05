import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { isGuestUser } from "utils/isGuestUser";

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

export const useFood = () => {
  const queryClient = useQueryClient();

  function useGetDBFoods(searchQuery) {
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
    return useMutation(addDBFood, {
      onSuccess: () => {
        queryClient.invalidateQueries(["dbFoods"]);
      },
    });
  }

  function useAddUserFood() {
    return useMutation(addUserFood, {
      onSuccess: () => {
        queryClient.invalidateQueries(["userFoods"]);
      },
    });
  }

  function useUpdateDBFood() {
    return useMutation(updateDBFood, {
      onSuccess: () => {
        queryClient.invalidateQueries(["dbFoods"]);
      },
    });
  }

  function useUpdateUserFood() {
    return useMutation(updateUserFood, {
      onSuccess: () => {
        queryClient.invalidateQueries(["userFoods"]);
      },
    });
  }

  function useDeleteDBFood() {
    return useMutation(deleteDBFood, {
      onSuccess: () => {
        queryClient.invalidateQueries(["dbFoods"]);
      },
    });
  }

  function useDeleteUserFood() {
    return useMutation(deleteUserFood, {
      onSuccess: () => {
        queryClient.invalidateQueries(["userFoods"]);
      },
    });
  }

  return {
    useGetDBFoods,
    useGetUsersFoods,
    useAddDBFood,
    useAddUserFood,
    useUpdateDBFood,
    useUpdateUserFood,
    useDeleteDBFood,
    useDeleteUserFood,
  };
};
