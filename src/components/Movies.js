import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import Row from "./Row";

const Movies = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getGenre = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.log(error.message);
      }
    };
    getGenre();
  }, []);

  return (
    <div>
      <Header />
      <div className=" py-10">
        {genres?.map((genre) => {
          return <Row key={genre?.id} id={genre?.id} genreName={genre?.name} />;
        })}
      </div>
    </div>
  );
};

export default Movies;
