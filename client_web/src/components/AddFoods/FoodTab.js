import React, { useState } from "react";
import { Button } from "components/shared/styling";
import { useDebounce } from "hooks/useDebounce";
import SearchBar from "./SearchBar";
import CreateFoodForm from "./CreateFoodForm";
import FoodList from "./FoodList";
import useInfiniteScroll from "hooks/useInfiniteScroll";

export default function FoodTab({
  hideCreateBtn = false,
  setSelectedFood,
  foodToEdit,
  setFoodToEdit,
  hooks,
}) {
  const [showCreateFoodForm, setShowCreateFoodForm] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const debouncedSearchValue = useDebounce(searchValue);

  const viewAsEditForm = foodToEdit && Object.keys(foodToEdit).length > 0;

  const { data, isLoading, fetchNextPage, isFetchingNextPage } = hooks.getFoods(
    debouncedSearchValue
  );

  const infiniteScrollLoader = useInfiniteScroll(fetchNextPage, [
    showCreateFoodForm,
    viewAsEditForm,
  ]);

  return (
    <div>
      {foodToEdit !== null || showCreateFoodForm ? (
        <CreateFoodForm
          setShowCreateFoodForm={setShowCreateFoodForm}
          setSelectedFood={setSelectedFood}
          foodToEdit={foodToEdit}
          setFoodToEdit={setFoodToEdit}
          hooks={hooks}
        />
      ) : (
        <>
          <div className="grid grid-cols-5 gap-2">
            <SearchBar
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {!hideCreateBtn && (
              <Button
                color="green"
                onClick={() => {
                  setShowCreateFoodForm(true);
                  setSelectedFood({});
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
            setSelectedFood={setSelectedFood}
            scrollRef={infiniteScrollLoader}
            isFetchingNextPage={isFetchingNextPage}
          />
        </>
      )}
    </div>
  );
}
