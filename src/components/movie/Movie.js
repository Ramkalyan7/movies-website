import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useParams, Link } from "react-router-dom";
import Cast from "./cast/Cast";
import Recommended from "./simmovies.js/Recommended";
import { FaPlay } from "react-icons/fa";

const Movie = () => {
  const [movie, setMovie] = useState({});
  const { movieID } = useParams();

  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
        );
        setMovie(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMovie();
  }, [movieID]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const {
    id,
    original_title,
    overview,
    poster_path,
    backdrop_path,
    release_date,
    tagline,
  } = movie;

  const customStyles = {
    backgroundImage: `url(https://image.tmdb.org/t/p/w500/${backdrop_path})`,
  };
  return (
    <div className="mt-[5.5rem]">
      <Outlet />

      <div
        style={customStyles}
        className="main-container w-[100%] bg-no-repeat  bg-cover mx-auto"
      >
        <div className=" flex items-center justify-evenly  mx-auto   bg-gray-800 opacity-[0.95] ">
          <div className="image-container ml-12 ">
            <img
              className="w-[300px] max-w-none"
              src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
              alt={original_title}
            />
          </div>
          <div className="details ml-4 h-[95%] px-24 py-0">
            <h2 className="text-6xl font-extrabold mb-10 mt-8 text-red-700 ">
              {original_title}
            </h2>
            <p className="text-3xl font-bold my-5 ">
              <span>Release Date :</span> {release_date}
            </p>
            <p className="text-3xl text-red-300 font-extrabold my-5 ">
              "{tagline ? tagline : "no tagline"}"
            </p>
            <p className="text-xl font-bold leading-10">{overview}</p>
            <div className="button my-8">
              <Link
                to={`/moviedetails/${movieID}/trailer`}
                className="bg-red-700 hover:bg-red-500 active:bg-red-900 text-white text-center font-extrabold text-xl px-4 py-2  rounded-sm"
              >
                <FaPlay className="inline-block pb-[5px]" /> Trailer
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Cast movie_ID={id} />
      <Recommended movie_ID={id} name="Recommendations" />
      <Recommended movie_ID={id} name="Similar" />
    </div>
  );
};

export default Movie;
