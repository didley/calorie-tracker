import { client } from "./client";
import { defaultUserFood } from "utils/defaultSessionData";
import { v4 as uuidv4 } from "uuid";

import {
  getValueFromSessionStorage,
  saveValueToSessionStorage,
} from "utils/sessionStorage";

import { getIsGuestUser } from "utils/isGuestUser";

function getDBFoods(page = 1, searchQuery) {
  return client.get(
    `/foods?page=${page}${searchQuery ? "&q=" + searchQuery : ""}`
  );
}
function getUsersFoods(page = 1, searchQuery) {
  if (getIsGuestUser()) {
    const sessionUserFoods = getValueFromSessionStorage(
      "userFoods",
      defaultUserFood
    );

    return { data: sessionUserFoods, hasNextPage: false, page: 1 };
  }

  return client.get(
    `/foods/my-foods?page=${page}${searchQuery ? "&q=" + searchQuery : ""}`
  );
}
function addDBFood(food) {
  return client.post("/foods", { body: food });
}
function addUserFood(food) {
  if (getIsGuestUser()) {
    const foodId = uuidv4();
    const apiFoodDetails = {
      _id: foodId,
      id: foodId,
      isDeleted: false,
      isUserFood: true,
      createdBy: "guest",
    };

    food.servingOptions &&
      (food.servingOptions = food.servingOptions.map((opt) => {
        const _id = uuidv4();
        return { _id, ...opt };
      }));

    const foodWithApiDetails = {
      ...food,
      ...apiFoodDetails,
    };

    const userFoodsList = getValueFromSessionStorage("userFoods", []);
    const newFoodList = [foodWithApiDetails, ...userFoodsList];
    saveValueToSessionStorage("userFoods", newFoodList);

    return { data: food, msg: `${food.name} Added to your foods` };
  }

  return client.post("/foods/my-foods", { body: food });
}
function updateDBFood({ id, food }) {
  return client.put(`/foods/${id}`, { body: food });
}
function updateUserFood({ id, food }) {
  if (getIsGuestUser()) {
    const userFoodsList = getValueFromSessionStorage("userFoods", []);
    const foodIndex = userFoodsList.findIndex((el) => el._id === food._id);
    userFoodsList[foodIndex] = food;
    saveValueToSessionStorage("userFoods", userFoodsList);

    return { data: food, msg: `${food.name} updated` };
  }

  return client.put(`/foods/my-foods/${id}`, { body: food });
}
function deleteDBFood(ids) {
  return client.delete(`/foods/${ids}`);
}
function deleteUserFood(ids) {
  if (getIsGuestUser()) {
    const sessionUserFoods = getValueFromSessionStorage(
      "userFoods",
      defaultUserFood
    );

    const updatedSessionUserFoods = sessionUserFoods.filter((food) => {
      if (!ids.includes(food._id)) return food;
    });

    return saveValueToSessionStorage("userFoods", updatedSessionUserFoods);
  }

  return client.delete(`/foods/my-foods/${ids}`);
}

export {
  getDBFoods,
  getUsersFoods,
  addDBFood,
  addUserFood,
  updateDBFood,
  updateUserFood,
  deleteDBFood,
  deleteUserFood,
};
