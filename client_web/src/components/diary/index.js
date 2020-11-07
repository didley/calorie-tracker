import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DiaryItem from "./DiaryItem";
import DatePickerContainer from "./DatePickerContainer";

export default function Diary({ setIsLoading, setError }) {
  const [data, setData] = useState({});
  const [selectedDate, setSelectedDate] = useState("2020-11-04"); // TODO: Replace initial state with (new Date())

  const { eaten, toEat, notes } = data;

  useEffect(() => {
    getDiaryData(selectedDate);
    // eslint-disable-next-line
  }, [selectedDate]);

  async function getDiaryData(date) {
    // eg. GET to /users is getFoods("users")
    try {
      setIsLoading(true);
      const res = await axios.get(`/api/diary/${date}`);
      console.log(res.data);
      setData(res.data);

      setIsLoading(false);
    } catch (err) {
      setError(err);
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

  const addBtnStyle =
    "bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded m-1";

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-3/4 md:w-1/2">
        <DatePickerContainer
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
        />
        <div className="bg-white p-3 m-2 rounded-lg shadow-lg">
          <h2>Diary</h2>
          <div className="space-y-12">
            <div>
              <div className="flex justify-between">
                <h3 className="my-auto">Eaten</h3>
                <Link
                  to={`/addFoods?date=${selectedDate}&list=eaten`}
                  className={addBtnStyle}
                >
                  +
                </Link>
              </div>
              <hr />
              <ul className="min-h-20 pb-5">
                {eaten &&
                  eaten.map((food) => <DiaryItem key={food._id} food={food} />)}
              </ul>
            </div>
            <div>
              <div className="flex justify-between">
                <h3 className="my-auto">To Eat</h3>
                <Link
                  to={`/addFoods?date=${selectedDate}&list=eaten`}
                  className={addBtnStyle}
                >
                  +
                </Link>
              </div>
              <hr />

              <ul className="min-h-20 pb-5">
                {toEat &&
                  toEat.map(
                    (food) => (
                      console.log("within toEat map", food),
                      (<DiaryItem key={food._id} food={food} />)
                    )
                  )}
              </ul>
            </div>
            <div>
              <h3 className="my-auto">Notes</h3>
              <hr />
              <textarea
                className="resize-none border-2 rounded focus:outline-none focus:shadow-outline h-40 mt-2 p-2 w-full"
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
