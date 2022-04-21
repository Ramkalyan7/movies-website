import axios from "axios";
import React, { useEffect, useState } from "react";

import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const index = Math.floor(Math.random() * 20);

const Header = () => {
  const [movie, setMovie] = useState({});
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getMovies = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28&without_keywords=comedy&with_watch_monetization_types=flatrate`
      );
      setMovie(response.data.results[index]);
    };
    getMovies();
  }, []);

  const customStyles = {
    backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie?.backdrop_path})`,
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="w-[90%] mx-auto mt-28">
      <div
        className="header bg-no-repeat bg-cover w-[100%] mx-auto"
        style={customStyles}
      >
        <div
          className="m-auto text-left py-24 w-[100%] h-[95%]  px-10 bg-gray-900 box-border
        opacity-[0.95]"
        >
          <h1 className="text-[5.7rem] text-red-600 font-extrabold">
            Welcome to Netflix
          </h1>
          <p className="text-2xl font-bold my-7 w-[80%]">
            Watch world's most popular movies of all genres . Search the movie
            you want . Get all the details of the movie you want .
          </p>
          <form
            onSubmit={handleSubmit}
            className="w-[80%] flex items-center justify-between mt-10"
          >
            <input
              type="text"
              placeholder="Search"
              className="px-3 py-2  w-[70%]  rounded-lg outline-none text-black"
              onChange={handleChange}
              value={query}
              name="query"
            />
            <button
              type="submit"
              className="w-[25%] text-2xl p-1  font-bold bg-red-600 rounded-md"
            >
              <FaSearch className="inline mx-1 mb-[4px]" /> Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
