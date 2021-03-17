import React from "react";

import ListItem from "components/shared/ListItem";
import PlaceholderListItem from "components/shared/ListItem/PlaceholderListItem";

export default function FoodList({
  isLoading,
  data,
  onClickFn,
  scrollRef,
  isFetchingNextPage,
}) {
  return (
    <ul>
      {isLoading && <PlaceholderListItem amount={5} />}
      {data &&
        data.pages.map((foods, index) => (
          <React.Fragment key={index}>
            {foods.data.map((food) => (
              <ListItem
                key={food._id}
                food={food}
                onClick={() => onClickFn(food)}
              />
            ))}
          </React.Fragment>
        ))}
      <div className="text-center" ref={scrollRef}>
        {!isLoading && (
          <small className="text-gray-600">
            {data
              ? isFetchingNextPage
                ? "Loading more..."
                : "Showing all"
              : "No foods"}
          </small>
        )}
      </div>
    </ul>
  );
}
