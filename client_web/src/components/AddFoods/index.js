import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { parseQuery } from "utils/parseQuery";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useGetDBFoods, useGetUsersFoods } from "hooks/useFood";
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

export default function AddFoods() {
  const dbHooks = {
    getFoods: useGetDBFoods,
    addFood: useAddDBFood,
    updateFood: useUpdateDBFood,
    deleteFood: useDeleteDBFood,
  };
  const userHooks = {
    getFoods: useGetUsersFoods,
    addFood: useAddUserFood,
    updateFood: useUpdateUserFood,
    deleteFood: useDeleteUserFood,
  };

  const initialState = {
    tabIndex: 0,
    selectedFood: {},
    foodToEdit: null,
    showFoodForm: false,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "CHANGE_TAB":
        return { ...state, tabIndex: action.payload };

      case "SET_SELECTED":
        return { ...state, selectedFood: action.payload };

      case "SHOW_CREATE":
        return {
          ...state,
          selectedFood: {},
          showFoodForm: true,
        };
      case "SET_EDITABLE":
        return {
          ...state,
          foodToEdit: state.selectedFood,
          showFoodForm: true,
          selectedFood: {},
        };
      case "CLEAR_FOOD_FORM":
        return { ...state, foodToEdit: null, showFoodForm: false };

      default:
        throw new Error();
    }
  }

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { tabIndex, selectedFood, foodToEdit, showFoodForm } = state;

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
                hooks={dbHooks}
              />
            ) : (
              <FoodTab
                dispatch={dispatch}
                hideCreateBtn
                foodToEdit={foodToEdit}
                hooks={dbHooks}
              ></FoodTab>
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
                hooks={userHooks}
              />
            ) : (
              <FoodTab
                dispatch={dispatch}
                foodToEdit={foodToEdit}
                hooks={userHooks}
              ></FoodTab>
            )}
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
