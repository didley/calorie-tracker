import React, { useState } from "react";
import { Button } from "components/shared/styling";
import { useGetUsersFoods } from "hooks/useFood";
import ListItem from "components/shared/ListItem";
import PlaceholderListItem from "components/shared/ListItem/PlaceholderListItem";
import SearchBar from "./SearchBar";
import CreateFoodForm from "./CreateFoodForm";

export default function MyFoodsTab({ setSelectedFood }) {
  const { data, isLoading } = useGetUsersFoods();
  const [showCreateFoodForm, setShowCreateFoodForm] = useState(true);

  return (
    <div>
      {showCreateFoodForm && (
        <CreateFoodForm setShowCreateFoodForm={setShowCreateFoodForm} />
      )}
      <div className="grid grid-cols-5 gap-2">
        {!showCreateFoodForm && (
          <>
            <SearchBar />
            <Button
              color="green"
              onClick={() => setShowCreateFoodForm(true)}
              className="col-start-5 col-span-2"
            >
              Create
            </Button>
          </>
        )}
      </div>
      <hr className="my-2" />
      <ul>
        {isLoading && <PlaceholderListItem amount={5} />}
        {data &&
          !showCreateFoodForm &&
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
