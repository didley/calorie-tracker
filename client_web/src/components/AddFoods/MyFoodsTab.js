import React, { useState } from "react";
import { Button } from "components/shared/styling";
import { useGetUsersFoods } from "hooks/useFood";
import ListItem from "components/shared/ListItem";
import PlaceholderListItem from "components/shared/ListItem/PlaceholderListItem";
import SearchBar from "./SearchBar";
import CreateFoodForm from "./CreateFoodForm";

export default function MyFoodsTab({ setSelectedFood }) {
  const [showCreateFoodForm, setShowCreateFoodForm] = useState(false);
  const {
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetUsersFoods();

  const loader = React.useRef(null);

  React.useEffect(() => {
    const handleObserver = (entities) => {
      const target = entities[0];
      if (target.isIntersecting) fetchNextPage();
    };

    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) observer.observe(loader.current);
  }, [fetchNextPage]);

  console.log({ data });
  return (
    <div>
      {showCreateFoodForm ? (
        <CreateFoodForm
          setShowCreateFoodForm={setShowCreateFoodForm}
          setSelectedFood={setSelectedFood}
        />
      ) : (
        <>
          <div className="grid grid-cols-5 gap-2">
            <SearchBar />
            <Button
              color="green"
              onClick={() => {
                setShowCreateFoodForm(true);
                setSelectedFood([]);
              }}
              className="col-start-5 col-span-2"
            >
              Create
            </Button>
          </div>
          <hr className="my-2" />
          <ul>
            {isLoading && <PlaceholderListItem amount={5} />}
            {data &&
              data.pages.map((foods, index) => (
                <React.Fragment key={index}>
                  {foods.data.map((food) => (
                    <ListItem
                      key={food._id}
                      food={food}
                      onClick={() => setSelectedFood(food)}
                    />
                  ))}
                </React.Fragment>
              ))}
            <div className="text-center" ref={loader}>
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
        </>
      )}
    </div>
  );
}
