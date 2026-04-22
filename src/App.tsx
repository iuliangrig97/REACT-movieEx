import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FetchRandomMovie from "./pages/FetchRandomMovie"
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
    <BrowserRouter>
      <FetchRandomMovie />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
