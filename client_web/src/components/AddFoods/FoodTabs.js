import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import axios from "axios";
import ListItem from "components/shared/ListItem";
import PlaceholderListItem from "components/shared/ListItem/PlaceholderListItem";
import { Link } from "react-router-dom";

import { Button } from "components/shared/styling";
import SearchBar from "./SearchBar";

import { useAlert } from "hooks/useAlert";

const propTypes = {
  setSelectedFood: PropTypes.func.isRequired,
};
export default function FoodTabs({ setSelectedFood }) {
  const { setIsLoading, isLoading, setTimedAlert } = useAlert();

  const [tabIndex, setTabIndex] = useState(0);
  const [data, setData] = useState({});

  const { dbFoods, recent, myFoods } = data;

  useEffect(() => {
    getFoods("foods", "dbFoods");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabIndex]);

  async function getFoods(route, objName) {
    try {
      setIsLoading(true);
      const res = await axios.get(`/api/${route}`);
      setData({ ...data, [objName]: res.data });
      setIsLoading(false);
    } catch (err) {
      setTimedAlert("error", err);
    }
  }

  // Btn styles
  const btnStyleSelected =
    "inline-block text-sm border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white";

  const btnStyle =
    "inline-block text-sm border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4";

  return (
    <div className="bg-white p-2 pt-0 rounded-lg shadow-lg max-w-sm mb-4 w-full">
      <div className="flex items-stretch">
        <Link
          to="/diary"
          className="py-1 pl-1 pr-3 rounded self-center hover:bg-gray-400"
        >
          {"<"}
        </Link>
        <h3>Add Food</h3>
      </div>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList className="flex justify-between">
          <Tab
            className={tabIndex === 0 ? btnStyleSelected : btnStyle}
            onClick={() => {
              getFoods("dbFoods");
            }}
          >
            Foods
          </Tab>
          <Tab
            className={tabIndex === 1 ? btnStyleSelected : btnStyle}
            onClick={() => {
              getFoods("recent");
            }}
          >
            Recent
          </Tab>
          <Tab
            className={tabIndex === 2 ? btnStyleSelected : btnStyle}
            onClick={() => {
              getFoods("myFoods");
            }}
          >
            My Food
          </Tab>
        </TabList>
        <hr className="my-2" />
        <TabPanel>
          <SearchBar />

          <ul>
            {isLoading === true && <PlaceholderListItem amount={5} />}
            {dbFoods &&
              dbFoods.map((food) => (
                <ListItem
                  key={food._id}
                  food={food}
                  onClickFn={() => setSelectedFood(food)}
                />
              ))}
          </ul>
        </TabPanel>
        <TabPanel>
          <ul>
            {dbFoods &&
              dbFoods.map((food) => (
                <ListItem
                  key={food._id}
                  food={food}
                  onClickFn={() => setSelectedFood(food)}
                />
              ))}
          </ul>
        </TabPanel>
        <TabPanel>
          <div className="flex justify-end">
            <Button color="green">Create</Button>
          </div>
          <ul>
            {dbFoods &&
              dbFoods.map((food) => (
                <ListItem
                  key={food._id}
                  food={food}
                  onClickFn={() => setSelectedFood(food)}
                />
              ))}
          </ul>
        </TabPanel>
      </Tabs>
    </div>
  );
}

FoodTabs.propTypes = propTypes;
