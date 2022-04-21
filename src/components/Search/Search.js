import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Loading from "../../Assets/loading.gif";
import Logo from "../../Assets/logo2.png";

const Search = () => {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState(query);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const [hasMore, SetHasMore] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(input);
  };

  const observer = useRef();
  const lastMovieOftheList = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((previousPageNumber) => {
            return previousPageNumber + 1;
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, isLoading]
  );

  useEffect(() => {
    setMovies([]);
    setPageNumber(1);
  }, [searchQuery]);

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    let cancel;

    const getMovies = async () => {
      try {
        const { data } = await axios({
          method: "Get",
          url: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${searchQuery}&page=${pageNumber}&include_adult=false`,
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });

        setMovies((previousMovies) => {
          return [...new Set([...previousMovies, ...data.results])];
        });
        SetHasMore(data.results.length > 0);
        setIsLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.log(error);
      }
    };
    getMovies();
    return () => cancel();
  }, [searchQuery, pageNumber]);
  return (
    <div>
      <div className="mt-24">
        <form
          onSubmit={handleSubmit}
          className="w-[80%] flex items-center justify-center mx-auto mt-36 mb-16"
        >
          <input
            type="text"
            placeholder="Search"
            className="px-3 py-2  w-[50%]   outline-none text-black rounded-3xl"
            onChange={handleChange}
            value={input}
            name="query"
          />
          <button
            type="submit"
            className="w-[15%] text-xl py-[0.4rem]  font-bold bg-red-400 hover:bg-red-600 active:bg-red-800 rounded-3xl -ml-8"
          >
            <FaSearch className="inline mx-1 mb-[4px]" /> Search
          </button>
        </form>

        <div className=" flex flex-wrap items-center justify-around">
          {movies?.map(({ id, poster_path }, index) => {
            if (movies.length === index + 1) {
              return (
                <div
                  ref={lastMovieOftheList}
                  className="w-[15%] m-4 hover:scale-110 hover:border-2 hover:border-white transition-all active:border-red-800 active:border-4"
                  key={id}
                >
                  <Link to={`/moviedetails/${id}`}>
                    <img
                      className="w-[100%] "
                      src={
                        poster_path
                          ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                          : Logo
                      }
                      alt=""
                    />
                  </Link>
                </div>
              );
            } else {
              return (
                <div
                  className="w-[15%] m-4 hover:scale-110 hover:border-2 hover:border-white transition-all active:border-red-800 active:border-4"
                  key={id}
                >
                  <Link to={`/moviedetails/${id}`}>
                    <img
                      className="w-[100%] "
                      src={
                        poster_path
                          ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                          : Logo
                      }
                      alt=""
                    />
                  </Link>
                </div>
              );
            }
          })}
        </div>
        {isLoading && (
          <img src={Loading} alt="loading..." className="w-24 mx-auto block" />
        )}
        {error && (
          <div className="text-3xl text-center my-8 text-red-800 font-bold">
            {error.message}!
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
