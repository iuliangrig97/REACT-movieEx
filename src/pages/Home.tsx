import { useState } from "react";
import SearchMovie from "../components/SearchMovie";
import MoreRandomMovies from "./MoreRandomMovies";
import TrendingMovies from "./TrendingMovies";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const isSearching = searchTerm.trim().length > 0;
  return (
    <div>
      <SearchMovie searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      {!isSearching && (
        <>
          <TrendingMovies />
          <MoreRandomMovies />
        </>
      )}
    </div>
  );
}
