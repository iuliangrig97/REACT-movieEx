import { useQuery } from "@tanstack/react-query";
import { fetchSearchMovie } from "./ApiFetchMovie";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import type { MovieResponse } from "../types/movieTypes";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedTerm, setDebouncedTerm] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedTerm;
}

interface SearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function SearchMovie({
  searchTerm,
  setSearchTerm,
}: SearchProps) {
  const debouncedTerm = useDebounce(searchTerm, 500);
  const {
    data: movies,
    isFetching,
    error,
  } = useQuery<MovieResponse, Error>({
    queryKey: ["searchMovie", debouncedTerm],
    queryFn: () => fetchSearchMovie(debouncedTerm),
    enabled: debouncedTerm.length > 0,
    staleTime: 1000 * 60 * 3,
  });

  if (error) return <div>Error: {error.message}</div>;

  return (
    <main>
      <div className="flex flex-col items-center">
        <div className="border border-white/30 flex flex-row items-center text-xl rounded-2xl relative">
          <p className="opacity-60 mx-2">🔍</p>
          <div className="relative ">
            <input
              type="text"
              placeholder="Search for a movie 🍿"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="focus:outline-none bg-transparent p-1 flex items-center justify-center text-center"
            />
            {isFetching && (
              <p className="absolute top-full left-0 text-sm text-gray-400 mt-1">
                Searching..
              </p>
            )}
          </div>
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
              }}
              className="mr-5 cursor-pointer"
            >
              ❌
            </button>
          )}
          {["sex", "porn", "xxx"].some((word) =>
            debouncedTerm.includes(word),
          ) && (
            <p className="mt-3 text-white/40">
              <span className="text-red-500">Contains forbidden word!</span> but
              i don't care
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 mt-4">
          {movies?.results.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}

          {movies?.results.length === 0 && debouncedTerm && (
            <p>No movies found for "{debouncedTerm}"</p>
          )}
        </div>
      </div>
    </main>
  );
}
