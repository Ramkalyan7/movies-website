import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cast from "./cast/Cast";
import Recommended from "./simmovies.js/Recommended";

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
    <div className="mt-14">
      <div
        style={customStyles}
        className="main-container w-[100%] bg-no-repeat  bg-cover mx-auto"
      >
        <div className=" flex items-center justify-evenly  mx-auto   bg-gray-800 opacity-[0.8] ">
          <div className="image-container ml-12 ">
            <img
              className="w-[300px] max-w-none"
              src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
              alt={original_title}
            />
          </div>
          <div className="details ml-4 h-[95%] p-24">
            <h2 className="text-6xl font-extrabold my-14  ">
              {original_title}
            </h2>
            <p className="text-3xl font-bold my-5 ">
              <span>Release Date :</span> {release_date}
            </p>
            <p className="text-3xl text-red-300 font-extrabold my-5 ">
              {tagline}
            </p>
            <p className="text-2xl font-bold leading-10">{overview}</p>
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
