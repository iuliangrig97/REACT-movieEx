import { useQuery } from "@tanstack/react-query";
import { fetchRandomMovie } from "../components/ApiFetchMovie";
import { useState } from "react";
import MovieCard from "../components/MovieCard";

export default function MoreRandomMovies() {
  const [page, setPage] = useState(() => Math.floor(Math.random() * 500) + 1);

  const {
    data: movies,
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["moreRandomMovies", page],
    queryFn: () => fetchRandomMovie(page),
    select: (data) => {
      const allResults = data.results || [];
      const randomSort = allResults.sort(() => 0.5 - Math.random());
      return randomSort.slice(0, 20);
    },
  });

  const handleRefresh = () => {
    const newPage = Math.floor(Math.random() * 500) + 1;
    setPage(newPage);
  };

  if (isLoading || !movies) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="my-2">
      <div className="flex items-center justify-center flex-col gap-2 mb-6">
        <h1 className="mt-12 text-white font-bold text-center text-3xl">
          🎭 More movies 🎭
        </h1>
        <button
          onClick={handleRefresh}
          className="block mx-auto mt-8 bg-blue-600 text-white px-4 py-2 rounded mb-6 cursor-pointer hover:scale-105"
        >
          {isFetching ? "Loading..." : "Click for more movies"}
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-2">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
}
