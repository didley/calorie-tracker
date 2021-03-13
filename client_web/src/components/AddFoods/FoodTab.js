import React, { useState } from "react";
import { Button } from "components/shared/styling";
import { useDebounce } from "hooks/useDebounce";
import SearchBar from "./SearchBar";
import FoodList from "./FoodList";
import useInfiniteScroll from "hooks/useInfiniteScroll";

export default function FoodTab({
  dispatch,
  hideCreateBtn = false,
  // setSelectedFood,
  foodToEdit,
  setShowFoodForm,
  hooks,
}) {
  const [searchValue, setSearchValue] = useState("");

  const viewAsEditForm = foodToEdit && Object.keys(foodToEdit).length > 0;

  const debouncedSearchValue = useDebounce(searchValue);

  const { data, isLoading, fetchNextPage, isFetchingNextPage } = hooks.getFoods(
    debouncedSearchValue
  );

  const infiniteScrollLoader = useInfiniteScroll(fetchNextPage, [
    viewAsEditForm,
  ]);

  return (
    <div>
      <div className="grid grid-cols-5 gap-2">
        <SearchBar
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {!hideCreateBtn && (
          <Button
            color="green"
            onClick={() => {
              setShowFoodForm(true);
              dispatch({ type: "CLEAR_SELECTED" });
            }}
            className="col-start-5 col-span-2"
          >
            Create
          </Button>
        )}
      </div>
      <hr className="my-2" />
      <FoodList
        isLoading={isLoading}
        data={data}
        onClickFn={(item) => dispatch({ type: "SET_SELECTED", payload: item })}
        // setSelectedFood={setSelectedFood}
        scrollRef={infiniteScrollLoader}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
}
