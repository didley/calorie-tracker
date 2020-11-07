import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar({ isLoading }) {
  const [hidden, setHidden] = useState(true);
  return (
    <nav className="flex items-center justify-between flex-wrap bg-red-500 p-5">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/diary" className="font-semibold text-xl tracking-tight">
          Calorie Tracker
        </Link>
      </div>
      {/* mobile menu button show/hide, delete this comm when functioning */}
      <div className="block md:hidden">
        <button
          onClick={() => {
            setHidden(!hidden);
          }}
          className="flex items-center px-3 py-2 rounded text-white hover:bg-red-400"
        >
          <svg
            className="fill-current h-5 w-5"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`${
          hidden ? "hidden" : ""
        } md:visible w-full block flex-grow md:flex md:items-center md:w-auto`}
      >
        <nav className="text-sm md:flex-grow">
          <Link to="/diary" className={linkStyle}>
            Diary
          </Link>
          <Link to="/login" className={linkStyle}>
            Login
          </Link>
          <Link to="/register" className={linkStyle}>
            Register
          </Link>
          <Link to="/" className={linkStyle}>
            Home
          </Link>
        </nav>
      </div>
    </nav>
  );
}

const linkStyle =
  "block md:inline-block md:mt-0 md:my-0 md:py-2 text-white hover:bg-red-400 mx-1 my-2 py-3 px-3 rounded";
