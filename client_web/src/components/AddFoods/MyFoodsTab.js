import React from "react";
import { Button } from "components/shared/styling";
import { useGetUsersFoods } from "hooks/useFood";
import ListItem from "components/shared/ListItem";
import PlaceholderListItem from "components/shared/ListItem/PlaceholderListItem";
import SearchBar from "./SearchBar";

export default function MyFoodsTab({ setSelectedFood }) {
  const { data, isLoading } = useGetUsersFoods();

  return (
    <div>
      <div className="flex justify-between">
        <SearchBar />
        <Button color="green">Create</Button>
      </div>
      <ul>
        {isLoading && <PlaceholderListItem amount={5} />}
        {data &&
          data.map((food) => (
            <ListItem
              key={food._id}
              food={food}
              onClickFn={() => setSelectedFood(food)}
            />
          ))}
      </ul>
    </div>
  );
}
