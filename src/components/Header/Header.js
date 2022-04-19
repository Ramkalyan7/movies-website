import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Header.css";
const index = Math.floor(Math.random() * 20);

const Header = () => {
  const [movie, setMovie] = useState({});
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

  return (
    <div className="header" style={customStyles}>
      <div className="mx-28 my-auto text-left">
        <h1 className="text-[5.7rem] text-red-600 font-extrabold">
          Welcome to Netflix
        </h1>
        <p className="text-3xl font-bold my-7">
          Watch world's most popular movies of all genres.Seach the movie you
          want. Get all the details of the movie you want .
        </p>
      </div>
    </div>
  );
};

export default Header;
