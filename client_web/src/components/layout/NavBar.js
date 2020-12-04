import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "hooks/useAuth";

export default function NavBar() {
  const auth = useAuth();
  const [hidden, setHidden] = useState(true);

  function handleLinkClick() {
    setHidden(true);
  }

  return (
    <nav className="flex items-center justify-between flex-wrap bg-red-500 p-5">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link
          to={auth.user ? "/diary" : "/"}
          className="font-semibold text-xl tracking-tight"
        >
          Calorie Tracker
        </Link>
      </div>
      {/* mobile menu button show/hide */}
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
          {auth.user ? (
            <>
              <Link to="/diary" className={linkStyle} onClick={handleLinkClick}>
                Diary
              </Link>
              <Link to="/" className={linkStyle} onClick={() => auth.logout()}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className={linkStyle} onClick={handleLinkClick}>
                Home
              </Link>
              <Link to="/login" className={linkStyle} onClick={handleLinkClick}>
                Login
              </Link>
              <Link
                to="/register"
                className={linkStyle}
                onClick={handleLinkClick}
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </nav>
  );
}

const linkStyle =
  "block md:inline-block md:mt-0 md:my-0 md:py-2 text-white hover:bg-red-400 mx-1 my-2 py-3 px-3 rounded";
