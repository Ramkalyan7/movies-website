import React, { useEffect, useState } from "react";
import Image from "./Image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Logo from "../Assets/logo2.png";
import axios from "axios";
import { Link } from "react-router-dom";

const Row = ({ id, genreName }) => {
  const [movies, setMovies] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${id}&without_keywords=comedy&with_watch_monetization_types=flatrate`
      );
      setMovies(response.data.results);
    };
    getData();
  }, [id]);
  return (
    <div>
      <h1 className="ml-14 mt-20 mb-8 font-bold text-4xl">{genreName}</h1>

      <div className=" w-[100%] px-8">
        <Slider {...settings}>
          {movies.map((movie) => {
            return (
              <div key={movie?.id}>
                <Link to={`/moviedetails/${movie?.id}`}>
                  <Image
                    imgUrl={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`
                        : Logo
                    }
                  />
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Row;
