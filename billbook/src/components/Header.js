import React, { useState } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
const Header = () => {
  const [navbar, setNavbar] = useState(false);


  const toggleNavbar = () => {
    setNavbar(!navbar);
  };

  return (
    <Router>
      <nav className="w-full bg-white">
        <div className="flex justify-between items-center px-4 py-4">
          <div>
            <Link to="/" className="text-black text-3xl font-bold no-underline">
              BillBook
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="lg:space-x-12 md:space-x-1">
              <Link
                to="/"
                className="text-2xl px-2 font-semibold hover:text-purple-700 no-underline"
              >
                Invoice History
              </Link>
            
              <Link
                to="/"
                className="text-2xl px-2 font-semibold hover:text-purple-700 no-underline"
              >
                Profile
              </Link>

              <Link
                to="/"
                className="text-2xl px-2 font-semibold hover:text-purple-700 no-underline"
              >
                Logout
              </Link>
             
            </div>
          </div>

          <div className="md:hidden">
            <button
              className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
              onClick={toggleNavbar}
            >
              {navbar ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-black"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div
          className={`${navbar ? "block" : "hidden"} md:hidden`}
          id="mobile-menu"
        >
          <div className="px-4 pt-2 pb-3 space-y-2 sm:px-3 text-center">
            <Link
              to="/"
              className="text-2xl font-medium hover:text-purple-700 block px-3 py-2 no-underline"
            >
              Invoice History
            </Link>
            <Link
              to="/"
              className="text-2xl font-medium hover:text-purple-700 block px-3 py-2 no-underline"
            >
               Profile
            </Link>
            <Link
              to="/"
              className="text-2xl font-medium hover:text-purple-700 block px-3 py-2 no-underline"
            >
              Logout
            </Link>
          
          </div>
        </div>
      </nav>
    </Router>
  );
};

export default Header;
