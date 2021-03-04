import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "react-query";

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

function useGetDBFoods(params) {
  // TODO
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
function useAddDBFood(params) {}
function useAddUserFood() {
  const queryClient = useQueryClient();
  return useMutation(addUserFood, {
    onSuccess: () => {
      queryClient.invalidateQueries(["userFoods"]);
    },
  });
}
function useUpdateDBFood(params) {}
function useUpdateUserFood() {
  const queryClient = useQueryClient();
  return useMutation(updateUserFood, {
    onSuccess: () => {
      queryClient.invalidateQueries(["userFoods"]);
    },
  });
}
function useDeleteDBFood(params) {}
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
