import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import MovieType from "./components/MovieType";
import { Route, Routes } from "react-router-dom";
import Movie from "./components/movie/Movie";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/movie/:type" element={<MovieType />} />
        <Route path="/moviedetails/:movieID" element={<Movie />} />
      </Routes>
    </div>
  );
}

export default App;
