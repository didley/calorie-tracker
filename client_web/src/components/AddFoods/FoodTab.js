import React, { useState } from "react";
import { Button } from "components/shared/styling";
import { useDebounce } from "hooks/useDebounce";
import SearchBar from "./SearchBar";
import FoodList from "./FoodList";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import { useGetDBFoods, useGetUsersFoods } from "hooks/useFood";
import { useAuth } from "hooks/useAuth";

export default function FoodTab({
  dispatch,
  hideCreateBtn = false,
  asUserFood = false,
}) {
  const [searchValue, setSearchValue] = useState("");

  const debouncedSearchValue = useDebounce(searchValue);

  const dbFood = useGetDBFoods(debouncedSearchValue);
  const userFood = useGetUsersFoods(debouncedSearchValue);

  const dbScrollLoader = useInfiniteScroll(dbFood.fetchNextPage, [asUserFood]);
  const userScrollLoader = useInfiniteScroll(userFood.fetchNextPage, [
    asUserFood,
  ]);
  const { isGuestUser } = useAuth();

  if (isGuestUser && !asUserFood)
    return (
      <div>
        <p className="py-6 text-center">Register to view database foods</p>
      </div>
    );

  return (
    <div>
      <div className="grid grid-cols-5 gap-2">
        <SearchBar
          searchValue={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {!hideCreateBtn && (
          <Button
            color="green"
            onClick={() => dispatch({ type: "SHOW_CREATE" })}
            className="col-start-5 col-span-2"
          >
            Create
          </Button>
        )}
      </div>
      <hr className="my-2" />
      <FoodList
        isLoading={dbFood.isLoading || userFood.isLoading}
        data={asUserFood ? userFood.data : dbFood.data}
        onClickFn={(item) => dispatch({ type: "SET_SELECTED", payload: item })}
        scrollRef={asUserFood ? userScrollLoader : dbScrollLoader}
        isFetchingNextPage={
          dbFood.isFetchingNextPage || userFood.isFetchingNextPage
        }
      />
    </div>
  );
}
