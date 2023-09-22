import { useState, useEffect } from "react";
import logoImage from "./img/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "../axios-config.js";
import state from "../store";

function NavBar() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5001/user/profile", { withCredentials: true })
      .then((res) => {
        setProfile(res.data);
      })
      .catch(() => {
        console.log("error getting profile");
      });
  }, []);
  return (
    <div className="blurred">
      <div className="mx-auto max-w-7xl px-2 py-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div>
            <img
              src={logoImage}
              alt="MyCompany Logo"
              className="image-h w-auto mr-2 rounded-lg "
            />
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="text-[#747472] rounded-md px-3 py-2 text-lg font-medium hover:scale-125 transition duration-300 ease-in-out hover:text-[#3C2A21]"
                  aria-current="page"
                >
                  Home
                </Link>
                <a
                  onClick={HandleLocation}
                  className="text-[#747472] rounded-md px-3 py-2 text-lg font-medium hover:scale-125 transition duration-300 ease-in-out hover:text-[#3C2A21]"
                >
                  Locations
                </a>
                <NavLink
                  to="#"
                  className="text-[#747472] rounded-md px-3 py-2 text-lg font-medium hover:scale-125 transition duration-300 ease-in-out hover:text-[#3C2A21]"
                >
                  Messenger
                </NavLink>
                <a
                  href="#"
                  className="text-[#747472] rounded-md px-3 py-2 text-lg font-medium hover:scale-125 transition duration-300 ease-in-out hover:text-[#3C2A21]"
                >
                  Calendar
                </a>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0
          "
          >
            <button
              type="button"
              className="
            relative rounded-full bg-[#3C2A21] p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2
             focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800
             hover:scale-110 transition duration-300 ease-in-out"
            >
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">View notifications</span>
              <svg
                className="h-8 w-8 "
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </button>

            {/* Profile dropdown */}
            <div className="relative ml-3">
              <div className="hover:scale-110 transition duration-300 ease-in-out">
                <button
                  type="button"
                  className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-10 w- rounded-full"
                    src={
                      profile.photo ||
                      "https://i.pinimg.com/736x/c0/c2/16/c0c216b3743c6cb9fd67ab7df6b2c330.jpg"
                    }
                    alt="User Profile"
                  />
                </button>
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    Your Profile
                  </Link>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                    Settings
                  </a>
                  <a
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer"
                  >
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
