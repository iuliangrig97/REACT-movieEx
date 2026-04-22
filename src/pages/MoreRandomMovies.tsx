import { useQuery } from "@tanstack/react-query";
import { fetchRandomMovie } from "../components/ApiFetchRandomMovie";
import { useState } from "react";
import MovieCard from "../components/MovieCard";

export default function MoreRandomMovies() {
  const [page, setPage] = useState(() => Math.floor(Math.random() * 500) + 1);

  const { data: movies, isLoading, error, isFetching } = useQuery({
    queryKey: ["moreRandomMovies", page],
    queryFn: () => fetchRandomMovie(page),
    select: (data) => {
        const allResults = data.results || []
        const randomSort = allResults.sort(() => 0.5 - Math.random())
        return randomSort.slice(0, 20);
    }
  });

  const handleRefresh = () => {
    const newPage = Math.floor(Math.random() * 500) + 1
    setPage(newPage);
  }

  if (isLoading || !movies) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="my-8">
      <div className="flex items-center justify-center flex-col gap-2 mb-6">
        <h1>More random Movies</h1>
        <button onClick={handleRefresh} className="cursor-pointer">
          {isFetching ? "Loading..." : "Click for more movies"}
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-8">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
}

