import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import MyFoodsTab from "./MyFoodsTab";
import SelectedFood from "components/SelectedFood";

export default function AddFoods() {
  const [selectedFood, setSelectedFood] = useState({});
  const [tabIndex, setTabIndex] = useState(0);

  const btnStyle =
    "inline-block text-sm border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4";
  const btnStyleSelected =
    "inline-block text-sm border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white";

  return (
    <div className="flex items-start justify-center flex-wrap mt-2">
      <SelectedFood selectedFood={selectedFood} />
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
            <Tab className={tabIndex === 0 ? btnStyleSelected : btnStyle}>
              Foods
            </Tab>
            <Tab className={tabIndex === 1 ? btnStyleSelected : btnStyle}>
              Recent
            </Tab>
            <Tab className={tabIndex === 2 ? btnStyleSelected : btnStyle}>
              My Food
            </Tab>
          </TabList>
          <hr className="my-2" />
          <TabPanel>
            <p>TODO</p>
          </TabPanel>
          <TabPanel>
            <p>TODO</p>
          </TabPanel>
          <TabPanel>
            <MyFoodsTab setSelectedFood={setSelectedFood} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
