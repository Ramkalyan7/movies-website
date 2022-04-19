import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const MovieType = () => {
  let { type } = useParams();
  const [movies, setMovies] = useState([]);
  const heading = type.replace("_", " ");
  const query = type.toLocaleLowerCase();

  useEffect(() => {
    const getMovies = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${query}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
      );
      setMovies(data.results);
    };
    getMovies();
  }, [query]);

  return (
    <div className="py-24">
      <h1 className="text-center my-9 font-bold text-4xl font-sans">
        {heading} Movies
      </h1>
      <div className=" flex flex-wrap items-center justify-around">
        {movies?.map(({ poster_path, id }) => {
          return (
            <div
              className="w-[15%] m-4 hover:scale-150 hover:border-2 hover:border-white transition-all active:border-red-800 active:border-4"
              key={id}
            >
              <Link to={`/moviedetails/${id}`}>
                <img
                  className="w-[100%] "
                  src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                  alt=""
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieType;
