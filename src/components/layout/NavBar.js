import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav class="flex items-center justify-between flex-wrap bg-red-500 p-6">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <span class="font-semibold text-xl tracking-tight">
          Calorie Tracker
        </span>
      </div>
      <div class="block md:hidden">
        <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div class="w-full block flex-grow md:flex md:items-center md:w-auto">
        <nav class="text-sm md:flex-grow">
          <Link
            to="/diary"
            className="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white"
          >
            Diary
          </Link>
        </nav>
      </div>
    </nav>
  );
}
