import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Logo from "../../../Assets/logo2.png";
const Person = () => {
  const { castID } = useParams();
  console.log(castID);

  const [person, setPerson] = useState({});

  useEffect(() => {
    const getPerson = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/person/${castID}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      );
      setPerson(data);
    };

    getPerson();
  }, [castID]);

  const customStyle = {
    backgroundImage:
      "url('https://thumbs.dreamstime.com/b/retro-film-production-accessories-still-life-placed-wooden-planks-concept-making-red-curtain-movie-screen-background-87870237.jpg')",
  };

  return (
    <div>
      <section
        className=" body-font mt-14 bg-no-repeat bg-cover w-[96%] mx-auto"
        style={customStyle}
      >
        <div className="container mx-auto flex px-5 bg-gray-800 py-8 md:flex-row flex-col items-center opacity-[0.8]">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img
              className="object-cover object-center rounded max-w-none w-[60%] mx-auto"
              alt="hero"
              src={
                person?.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${person?.profile_path}`
                  : Logo
              }
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-6xl text-4xl mb-8  font-extrabold text-red-600">
              {person?.name}
            </h1>

            <p className="mb-8  font-bold sm:text-3xl text-2xl leading-10">
              {person?.biography?.slice(0, 300)}....
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Person;
