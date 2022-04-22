import React from "react";
import Logo from "../Assets/logo.jpg";
import { NavLink } from "react-router-dom";
import "../index.css";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[2] bg-black border-b-2 border-red-900">
      <nav>
        <ul className="flex justify-between items-center sm:px-5">
          <div>
            <li className="sm:mx-5 mx-1">
              <NavLink className="text-lg" to="/">
                <img src={Logo} alt="logo" className="sm:w-[180px] w-[136px]" />
              </NavLink>
            </li>
          </div>
          <div className="hidden">
            <div className="flex justify-center items-center ">
              <li className="mx-5 font-bold hover:border-b-2 hover:border-white text-gray-300 ">
                <NavLink className="text-lg" to="/">
                  Home
                </NavLink>
              </li>

              <li className="mx-5 font-bold hover:border-b-2 hover:border-white text-gray-300 ">
                <NavLink className="text-lg" to="/movie/Popular">
                  Popular
                </NavLink>
              </li>
              <li className="mx-5 font-bold hover:border-b-2 hover:border-white text-gray-300 ">
                <NavLink className="text-lg" to="/movie/Now_Playing">
                  Now Playing
                </NavLink>
              </li>
              <li className="mx-5 font-bold hover:border-b-2 hover:border-white text-gray-300 ">
                <NavLink className="text-lg" to="/movie/Upcoming">
                  Upcoming
                </NavLink>
              </li>
              <li className="mx-5 font-bold hover:border-b-2 hover:border-white text-gray-300 ">
                <NavLink className="text-lg" to="/movie/Top_Rated">
                  Top Rated
                </NavLink>
              </li>
              <li className="mx-5 font-bold hover:border-b-2 hover:border-white text-gray-300 ">
                <NavLink className="text-lg" to="/search/sherlock">
                  Search
                </NavLink>
              </li>
            </div>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
