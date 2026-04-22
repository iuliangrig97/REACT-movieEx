import { useQuery } from "@tanstack/react-query";
import MovieCard from "../components/TrendingMoviesCard";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

async function fetchPopular() {
  const popularResult = `${API_BASE_URL}/movie/popular`;
  const res = await fetch(popularResult, API_OPTIONS);

  if (!res.ok) {
    throw new Error("failed popular");
  }

  return await res.json();
}

export default function TrendingMovies() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: fetchPopular,
    select: (data) => data.results.slice(0, 12),
    staleTime: 1000 * 60 * 5
  });

  if (isLoading || !data) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="mt-4">
      <h2 className="my-[1rem] text-white font-bold text-center text-3xl">
        🥇 Trending movies 🥇
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 ml-6 md:ml-[4rem] ">
        {data?.map((movie, index) => (
          <MovieCard key={movie.id} {...movie} index={index} />
        ))}
      </div>
    </section>
  );
}
