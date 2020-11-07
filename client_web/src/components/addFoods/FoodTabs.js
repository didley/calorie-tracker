import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import axios from "axios";
import Foods from "./Foods";
import RecentFoods from "./RecentFoods";
import MyFoods from "./MyFoods";
import ListItem from "../ListItem";

import PropTypes from "prop-types";

export default function FoodTabs({ onSelect, setIsLoading, setError }) {
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
      console.log("res.data OUTPUT", res.data);
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
    <div className="bg-white p-3 m-2 rounded-lg shadow-lg max-w-md">
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
          {dbFoods && dbFoods.map((food) => <ListItem food={food} />)}
          {/* <Foods data={dbFoods} onSelect={onSelect} /> */}
        </TabPanel>
        <TabPanel>
          <RecentFoods data={recent} onSelect={onSelect} />
        </TabPanel>
        <TabPanel>
          <MyFoods data={myFoods} onSelect={onSelect} />
        </TabPanel>
      </Tabs>
    </div>
  );
}

FoodTabs.propTypes = {
  onSelect: PropTypes.func.isRequired,
};
