import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import MovieType from "./components/MovieType";
import { Route, Routes } from "react-router-dom";
import Movie from "./components/movie/Movie";
import Person from "./components/movie/CastDetails/Person";
import Trailer from "./components/movie/video/Trailer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/movie/:type" element={<MovieType />} />
        <Route path="/moviedetails/:movieID" element={<Movie />}>
          <Route path="trailer" element={<Trailer />} />
        </Route>
        <Route path="/castdetails/:castID" element={<Person />} />
      </Routes>
    </div>
  );
}

export default App;
