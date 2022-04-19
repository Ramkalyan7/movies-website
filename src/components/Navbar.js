import React from "react";
import Logo from "../Assets/logo.jpg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[2] bg-black border-b-2 border-red-900">
      <nav>
        <ul className="flex justify-between items-center">
          <div>
            <li className="mx-5">
              <Link to="/">
                <img src={Logo} alt="logo" className="w-[180px]" />
              </Link>
            </li>
          </div>
          <div className="w-[16%] ">
            <input
              type="text"
              placeholder="Search"
              className="px-3 py-2 w-[100%]  rounded-lg outline-none text-black"
            />
          </div>
          <div className="flex justify-evenly items-center">
            <li className="mx-5 font-bold hover:border-b-2 hover:border-white  ">
              <Link to="/">Home</Link>
            </li>

            <li className="mx-5 font-bold hover:border-b-2 hover:border-white  ">
              <Link to="/movie/Popular">Popular</Link>
            </li>
            <li className="mx-5 font-bold hover:border-b-2 hover:border-white  ">
              <Link to="/movie/Now_Playing">Now Playing</Link>
            </li>
            <li className="mx-5 font-bold hover:border-b-2 hover:border-white  ">
              <Link to="/movie/Upcoming">Upcoming</Link>
            </li>
            <li className="mx-5 font-bold hover:border-b-2 hover:border-white  ">
              <Link to="/movie/Top_Rated">Top Rated</Link>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
