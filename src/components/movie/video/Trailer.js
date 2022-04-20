import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Trailer = () => {
  const [trailer, setTrailer] = useState([]);
  const { movieID } = useParams();

  useEffect(() => {
    const getVideo = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      );
      const video = data?.results?.find((video) => {
        return (
          video?.type === "Trailer" &&
          video?.official &&
          video.site === "YouTube"
        );
      });

      setTrailer(video?.key);
    };
    getVideo();
  }, [movieID]);

  return trailer ? (
    <div>
      <div className="mx-auto mt-20 w-[40%] ">
        <iframe
          width="500"
          height="300"
          src={`https://www.youtube.com/embed/${trailer}?autoplay=1`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="video"
        />
      </div>
    </div>
  ) : (
    <h1 className="my-32 text-5xl text-center text-red-500">
      Sorry ! Trailer is not available
    </h1>
  );
};

export default Trailer;
