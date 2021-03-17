import React from "react";

export default function useAddFoodReducer() {
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
        throw new Error(
          `Unhandled action type ${action.type} in AddFoods reducer`
        );
    }
  }

  const [state, dispatch] = React.useReducer(reducer, initialState);

  return [state, dispatch];
}
