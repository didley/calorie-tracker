import { client } from "./client";

function getDBFoods(page = 1, searchQuery) {
  return client.get(
    `/foods?page=${page}${searchQuery ? "&q=" + searchQuery : ""}`
  );
}
function getUsersFoods(page = 1, searchQuery) {
  return client.get(
    `/foods/my-foods?page=${page}${searchQuery ? "&q=" + searchQuery : ""}`
  );
}
function addDBFood(food) {
  return client.post("/foods", { body: food });
}
function addUserFood(food) {
  return client.post("/foods/my-foods", { body: food });
}
function updateDBFood({ id, food }) {
  return client.put(`/foods/${id}`, { body: food });
}
function updateUserFood({ id, food }) {
  return client.put(`/foods/my-foods/${id}`, { body: food });
}
function deleteDBFood(ids) {
  return client.delete(`/foods/${ids}`);
}
function deleteUserFood(ids) {
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
