import { useQuery } from "@tanstack/react-query";
import MovieCard from "../components/TrendingMoviesCard";
import { fetchPopular } from "../components/ApiFetchMovie";
import type { Movie, MovieResponse } from "../types/movieTypes";

export default function TrendingMovies() {
  const { data, isLoading, error } = useQuery<MovieResponse, Error, Movie[]>({
    queryKey: ["popularMovies"],
    queryFn: fetchPopular,
    select: (data) => data.results.slice(0, 12),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading || !data) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="mt-4">
      <h2 className="my-4 text-white font-bold text-center text-3xl">
        🥇 Trending movies 🥇
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-8">
        {data?.map((movie, index) => (
          <MovieCard key={movie.id} {...movie} index={index} />
        ))}
      </div>
    </section>
  );
}
