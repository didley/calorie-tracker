import { client } from "./client";

function getDBFoods(params) {
  // TODO
}
function getUsersFoods() {
  return client.get("/foods/my-foods");
}
function addDBFood(params) {
  // TODO
}
function addUserFood(food) {
  return client.post("/foods/my-foods", { body: food });
}
function updateDBFood(params) {
  // TODO
}
function updateUserFood(id, food) {
  return client.put(`/foods/my-foods/${id}`, { body: food });
}
function deleteDBFood(params) {
  // TODO
}
function deleteUserFood(id) {
  return client.delete(`/foods/my-foods/${id}`);
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
