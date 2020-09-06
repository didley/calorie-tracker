import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import axios from "axios";
import Foods from "./Foods";
import RecentFoods from "./RecentFoods";
import MyFoods from "./MyFoods";

import PropTypes from "prop-types";

export default function FoodTabs({ onSelect }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { foodDatabase, recent, myFoods } = data;

  useEffect(() => {
    getFoods("foodDatabase");
    // eslint-disable-next-line
  }, []);

  async function getFoods(routName) {
    // eg. GET to /users is getFoods("users")
    try {
      setLoading(true);
      const res = await axios.get(`/${routName}`);
      setData({ ...data, [routName]: res.data });

      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  // Btn styles
  const btnStyleSelected =
    "inline-block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white";

  const btnStyle =
    "inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4";

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-3 m-2 rounded-lg shadow-lg max-w-md">
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList className="flex justify-between">
          <Tab
            className={tabIndex === 0 ? btnStyleSelected : btnStyle}
            onClick={() => {
              getFoods("foodDatabase");
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
          <Foods data={foodDatabase} onSelect={onSelect} />
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
