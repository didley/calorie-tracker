import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import DiaryItem from "./DiaryItem";

export default function Diary() {
  const [data, setData] = useState({});
  const [date, setDate] = useState("2020-09-05");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { eaten, toEat, notes } = data;

  useEffect(() => {
    getDiaryData(date);
    // eslint-disable-next-line
  }, []);

  async function getDiaryData(date) {
    // eg. GET to /users is getFoods("users")
    try {
      setLoading(true);
      const res = await axios.get(`/diary?date=${date}`);
      setData(res.data[0]);

      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  function handleNoteChange(e) {
    setData({ ...data, notes: e.target.value });
  }

  const addBtnStyle =
    "bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded m-1";

  return (
    <div className="bg-white p-3 m-2 rounded-lg shadow-lg max-w-md">
      <h2>Diary</h2>
      <div className="space-y-12">
        <div>
          <div className="flex justify-between">
            <h3 className="my-auto">Eaten</h3>
            <Link to={`/addFoods?date=${date}`} className={addBtnStyle}>
              +
            </Link>
          </div>
          <hr />
          <ul className="h-20 pb-5">
            {eaten &&
              eaten.map((food) => <DiaryItem key={food.id} food={food} />)}
          </ul>
        </div>
        <div>
          <div className="flex justify-between">
            <h3 className="my-auto">To Eat</h3>
            <Link
              to={`/addFoods?date=${date}&list=eaten`}
              className={addBtnStyle}
            >
              +
            </Link>
          </div>
          <hr />
          <ul className="h-20 pb-5">
            {toEat &&
              toEat.map((food) => <DiaryItem key={food.id} food={food} />)}
          </ul>
        </div>
        <div>
          <h3 className="my-auto">Notes</h3>
          <hr />
          <textarea
            class="resize-none border-2 rounded focus:outline-none focus:shadow-outline h-40 mt-2 p-2 w-full"
            type="text"
            placeholder="Click here to add a note..."
            value={notes}
            onChange={handleNoteChange}
          />
        </div>
      </div>
    </div>
  );
}
