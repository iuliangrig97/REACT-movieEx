import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FetchRandomMovie from "./pages/FetchRandomMovie"

function App() {
  return (
    <BrowserRouter>
      <FetchRandomMovie />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
  