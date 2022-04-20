import axios from "axios";
import React, { useEffect, useState } from "react";
import Logo from "../../../Assets/logo2.png";
import Image from "../../Image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const Cast = ({ movie_ID }) => {
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

  const [casts, setCasts] = useState([]);
  useEffect(() => {
    const getCast = async () => {
      if (movie_ID) {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie_ID}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
        );
        setCasts(data.cast);
      }
    };
    getCast();
  }, [movie_ID]);

  return casts.length > 10 ? (
    <div>
      <div className="my-14">
        <h1 className="my-5 ml-20 text-4xl font-extrabold">Cast</h1>

        <div className=" w-[100%] px-8">
          <Slider {...settings}>
            {casts?.map((cast) => {
              return (
                <div key={cast?.id}>
                  <Link to={`/castdetails/${cast.id}`}>
                    <Image
                      imgUrl={
                        cast.profile_path
                          ? `https://image.tmdb.org/t/p/w500/${cast?.profile_path}`
                          : Logo
                      }
                    />
                    {cast.profile_path && (
                      <p className="text-center text-sm font-bold">
                        {cast?.name}
                      </p>
                    )}
                  </Link>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  ) : null;
};

export default Cast;
