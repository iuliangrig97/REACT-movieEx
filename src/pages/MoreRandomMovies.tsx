import { useQuery } from "@tanstack/react-query";
import { fetchRandomMovie } from "../components/ApiFetchMovie";
import { useState } from "react";
import MovieCard from "../components/MovieCard";
import type { Movie, MovieResponse } from "../types/movieTypes";

let currentPage = Math.floor(Math.random() * 500) + 1;

export default function MoreRandomMovies() {
  const [page, setPage] = useState(currentPage);

  const {
    data: movies,
    isLoading,
    error,
    isFetching,
  } = useQuery<MovieResponse, Error, Movie[]>({
    queryKey: ["moreRandomMovies", page],
    queryFn: () => fetchRandomMovie(page),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    select: (data) => {
      return data.results || [];
    },
  });

  const handleRefresh = () => {
    const newPage = Math.floor(Math.random() * 500) + 1;
    currentPage = newPage
    setPage(newPage);
  };

  const showSkeleton = isLoading && !movies;
  if (error) return <div className="text-red-600">Error: {error.message}</div>;

  return (
    <div className="my-2 min-h-[80vh]">
      <div className="flex items-center justify-center flex-col gap-2 mb-6">
        <h1 className="mt-12 text-white font-bold text-center text-3xl">
          🎭 More movies 🎭
        </h1>

        <button
          onClick={handleRefresh}
          disabled={isFetching}
          className="block mx-auto mt-8 bg-blue-600 text-white px-4 py-2 rounded mb-6 cursor-pointer hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isFetching ? "Loading fresh movies..." : "Click for more movies"}
        </button>
      </div>
      {showSkeleton ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-2">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="aspect-2/3 bg-white/10 animate-pulse rounded-xl"
            />
          ))}
        </div>
      ) : (
        <div
          className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-2 transition-opacity duration-300 ${isFetching ? "opacity-50" : "opacity-100"}`}
        >
          {movies?.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      )}
    </div>
  );
}
