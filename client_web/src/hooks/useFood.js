import { useQuery, useMutation, useQueryClient } from "react-query";

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
function useGetUsersFoods() {
  return useQuery("userFoods", getUsersFoods);
}
function useAddDBFood(params) {}
function useAddUserFood() {
  const queryClient = useQueryClient();
  return useMutation(addUserFood, {
    onSuccess: (_response, variables) => {
      queryClient.invalidateQueries(["userFoods", variables.date]);
    },
  });
}
function useUpdateDBFood(params) {}
function useUpdateUserFood(params) {}
function useDeleteDBFood(params) {}
function useDeleteUserFood(params) {}

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
