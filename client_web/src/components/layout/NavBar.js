import React from "react";
import { Link } from "react-router-dom";

export default function NavBar({ OKTA_CALLBACK_PATH }) {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-red-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/diary" className="font-semibold text-xl tracking-tight">
          Calorie Tracker
        </Link>
      </div>
      {/* mobile menu button show/hide, delete this comm when functioning */}
      <div className="block md:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow md:flex md:items-center md:w-auto">
        <nav className="text-sm md:flex-grow">
          <Link
            to="/diary"
            className="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mx-1"
          >
            Diary
          </Link>
          <Link
            to={OKTA_CALLBACK_PATH}
            className="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mx-1"
          >
            Login
          </Link>
        </nav>
      </div>
    </nav>
  );
}
