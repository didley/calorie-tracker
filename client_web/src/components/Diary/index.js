import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ListItem from "components/shared/ListItem";
import EditMenu from "components/shared/EditMenu";
import DatePickerContainer from "./DatePickerContainer";

import { useAlert } from "hooks/useAlert";

export default function Diary() {
  const { setIsLoading, setTimedAlert } = useAlert();

  const [data, setData] = useState({});
  const [selectedDate, setSelectedDate] = useState("2020-11-04"); // TODO: Replace initial state with (new Date())
  const [showSelectBtn, setShowSelectBtn] = useState(true);
  const [selectedIDs, setSelectedIDs] = useState([]);

  const { eaten, toEat, notes } = data;

  useEffect(() => {
    setData({});
    getDiaryData(selectedDate);
    // eslint-disable-next-line
  }, [selectedDate]);

  function toggleShowSelectBtn() {
    setSelectedIDs([]);
    setShowSelectBtn(!showSelectBtn);
  }

  async function getDiaryData(date) {
    // eg. GET to /users is getFoods("users")
    try {
      setIsLoading(true);
      const res = await axios.get(`/api/diary/${date}`);
      setData(res.data);
      setIsLoading(false);
    } catch (err) {
      if (err.response.status !== 404) {
        setTimedAlert("error", err);
      }
      setIsLoading(false);
    }
  }

  function handleDateChange(date) {
    const ISODate = new Date(date).toISOString().substr(0, 10);
    setSelectedDate(ISODate);
  }

  function handleNoteChange(e) {
    setData({ ...data, notes: e.target.value });
  }

  function handleSelectFood(selectedFood) {
    if (showSelectBtn) {
      const foundId = selectedIDs.find((id) => id === selectedFood._id);
      if (foundId) {
        setSelectedIDs(selectedIDs.filter((id) => id !== foundId));
      } else {
        setSelectedIDs([...selectedIDs, selectedFood._id]);
      }
    } else {
      console.log({ selectedFood });
    }
  }

  const addBtnStyle =
    "bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded m-1";

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full max-w-xl">
        <div className="flex justify-center">
          <DatePickerContainer
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
          />
        </div>
        <div className="bg-white p-3 mx-1 mb-3 rounded-lg shadow-lg">
          <div className="">
            <h2 className="inline font-bold text-3xl">Diary</h2>
            <button
              onClick={toggleShowSelectBtn}
              className="inline text-center text-xs appearance-none text-gray-500 py-1 px-2 mx-1 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 hover:text-red-500 hover:bg-gray-200"
            >
              {showSelectBtn ? "Clear" : "Edit"}
            </button>
            {showSelectBtn && (
              <EditMenu
                selectedItems={selectedIDs}
                selectedDate={selectedDate}
              />
            )}
          </div>
          <div className="space-y-6">
            <div>
              <div className="border-b flex justify-between">
                <h3 className="my-auto">Eaten</h3>
                <Link
                  to={`/addFoods?date=${selectedDate}&list=eaten`}
                  className={addBtnStyle}
                >
                  +
                </Link>
              </div>
              <ul className="inline-block w-full h-32">
                {eaten &&
                  eaten.map((food) => (
                    <ListItem
                      key={food._id}
                      food={food.food_id}
                      chosenOptions={food.chosenOptions}
                      showSelectBtn={showSelectBtn}
                      onClickFn={() => handleSelectFood(food)}
                    />
                  ))}
              </ul>
            </div>
            <div>
              <div className="border-b flex justify-between">
                <h3 className="my-auto">To Eat</h3>
                <Link
                  to={`/addFoods?date=${selectedDate}&list=to-eat`}
                  className={addBtnStyle}
                >
                  +
                </Link>
              </div>
              <ul className="inline-block w-full h-32">
                {toEat &&
                  toEat.map((food) => (
                    <ListItem
                      key={food._id}
                      food={food.food_id}
                      chosenOptions={food.chosenOptions}
                      showSelectBtn={showSelectBtn}
                      onClickFn={() => handleSelectFood(food)}
                    />
                  ))}
              </ul>
            </div>
            <div>
              <h3 className="border-b my-auto">Notes</h3>
              <textarea
                className="resize-none border-2 text-sm rounded focus:outline-none focus:shadow-outline h-40 mt-2 p-2 w-full"
                type="text"
                placeholder="Click here to add a note..."
                value={notes}
                onChange={handleNoteChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
