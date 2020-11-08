import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import axios from "axios";
import ListItem from "../ListItem";
import SearchBar from "./SearchBar";

export default function FoodTabs({ setSelectedFood, setIsLoading, setError }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [data, setData] = useState({});

  const { dbFoods, recent, myFoods } = data;

  useEffect(() => {
    getFoods("foods", "dbFoods");
    // eslint-disable-next-line
  }, []);

  async function getFoods(route, objName) {
    try {
      setIsLoading(true);
      const res = await axios.get(`/api/${route}`);
      setData({ ...data, [objName]: res.data });
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }

  // Btn styles
  const btnStyleSelected =
    "inline-block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white";

  const btnStyle =
    "inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4";

  return (
    <div className="bg-white p-2 rounded-lg shadow-lg max-w-md w-full">
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
            <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded m-1 text-sm">
              Create Food
            </button>
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

FoodTabs.propTypes = {
  setSelectedFood: PropTypes.func.isRequired,
};
