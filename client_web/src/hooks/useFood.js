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
function useGetUsersFoods(params) {
  return useQuery("userFoods", getUsersFoods);
}
function useAddDBFood(params) {}
function useAddUserFood(params) {}
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
