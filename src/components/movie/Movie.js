import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Movie = () => {
  const [movie, setMovie] = useState({});
  const { movieID } = useParams();

  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
  }, [movieID]);
  return (
    <div className="mt-48">
      this is the movie component width movie ID:{movieID}
    </div>
  );
};

export default Movie;
