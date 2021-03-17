import React from "react";
import { Link, useLocation } from "react-router-dom";
import { parseQuery } from "utils/parseQuery";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useAuth } from "hooks/useAuth";

import FoodForm from "./FoodForm";
import FoodTab from "./FoodTab";
import SelectedFood from "components/SelectedFood";

import {
  useAddDBFood,
  useUpdateDBFood,
  useDeleteDBFood,
  useAddUserFood,
  useUpdateUserFood,
  useDeleteUserFood,
} from "hooks/useFood";
import useAddFoodReducer from "./useAddFoodReducer";

export default function AddFoods() {
  const { user } = useAuth();
  const [state, dispatch] = useAddFoodReducer();
  const { tabIndex, selectedFood, foodToEdit, showFoodForm } = state;

  const showEditBtnWhenAdmin = selectedFood?.isUserFood
    ? true
    : ["admin", "superAdmin"].includes(user.role);

  const dbMutationFns = {
    addFood: useAddDBFood,
    updateFood: useUpdateDBFood,
    deleteFood: useDeleteDBFood,
  };
  const userMutationFns = {
    addFood: useAddUserFood,
    updateFood: useUpdateUserFood,
    deleteFood: useDeleteUserFood,
  };

  const location = useLocation();
  const params = parseQuery(location.search);

  const btnStyle =
    "inline-block text-sm border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4";
  const btnStyleSelected =
    "inline-block text-sm border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white";

  return (
    <div className="flex items-start justify-center flex-wrap mt-2">
      <SelectedFood
        selectedFood={selectedFood}
        editBtnOnClick={() => dispatch({ type: "SET_EDITABLE" })}
        showEditBtn={showEditBtnWhenAdmin}
      />
      <div className="bg-white p-2 pt-0 rounded-lg shadow-lg max-w-sm mb-4 w-full">
        <div className="flex items-stretch">
          <Link
            to={`/diary/${params.date}`}
            className="py-1 pl-1 pr-3 rounded self-center hover:bg-gray-400"
          >
            {"<"}
          </Link>
          <h3>Add Food</h3>
        </div>
        <Tabs
          selectedIndex={tabIndex}
          onSelect={(index) => dispatch({ type: "CHANGE_TAB", payload: index })}
        >
          <TabList className="flex justify-between">
            <Tab className={tabIndex === 0 ? btnStyleSelected : btnStyle}>
              Foods
            </Tab>
            <Tab className={tabIndex === 1 ? btnStyleSelected : btnStyle}>
              Recent
            </Tab>
            <Tab className={tabIndex === 2 ? btnStyleSelected : btnStyle}>
              My Food
            </Tab>
          </TabList>
          <hr className="my-2" />
          <TabPanel>
            {showFoodForm ? (
              <FoodForm
                dispatch={dispatch}
                foodToEdit={foodToEdit}
                mutationFns={dbMutationFns}
              />
            ) : (
              <FoodTab dispatch={dispatch} hideCreateBtn />
            )}
          </TabPanel>
          <TabPanel>
            <p>TODO</p>
          </TabPanel>
          <TabPanel>
            {showFoodForm ? (
              <FoodForm
                dispatch={dispatch}
                foodToEdit={foodToEdit}
                mutationFns={userMutationFns}
              />
            ) : (
              <FoodTab dispatch={dispatch} asUserFood />
            )}
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
