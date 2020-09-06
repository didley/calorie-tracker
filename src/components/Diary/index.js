import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import DiaryItem from "./DiaryItem";

export default function Diary() {
  const [data, setData] = useState({});
  const [date, setDate] = useState("2020-09-04");
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

  return (
    <div className="bg-white p-3 m-2 rounded-lg shadow-lg max-w-md">
      <div className="flex justify-between">
        <h2 className="my-auto">Diary</h2>
        <Link
          to={`/addFoods?date=${date}`}
          className="bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
        >
          +
        </Link>
      </div>
      <div>
        <div>
          <h3>Eaten</h3>
          <hr />
          <ul className="h-20 pb-5">
            {eaten &&
              eaten.map((food) => <DiaryItem key={food.id} food={food} />)}
          </ul>
        </div>
        <div>
          <h3>To Eat</h3>
          <hr />
          <ul className="h-20 pb-5">
            {toEat &&
              toEat.map((food) => <DiaryItem key={food.id} food={food} />)}
          </ul>
        </div>
        <div>
          <h3>Notes</h3>
          <hr />
          <p className="h-20 pb-5">{notes}</p>
        </div>
      </div>
    </div>
  );
}
