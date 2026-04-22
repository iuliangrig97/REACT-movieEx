import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchRandomMovie } from "../components/ApiFetchMovie";
import { Link } from "react-router-dom";

export default function MovieApi() {
  const [page, setPage] = useState(() => Math.floor(Math.random() * 500) + 1);
  const [index, setIndex] = useState(0);

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["randomMovie", page],
    queryFn: () => fetchRandomMovie(page),
  });

  const handleRefresh = () => {
    const newPage = Math.floor(Math.random() * 500) + 1;
    setPage(newPage);

    if (data?.results?.length) {
      const newIndex = Math.floor(Math.random() * data.results.length);
      setIndex(newIndex);
    }
  };

  if (isLoading || !data) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const safeIndex = index % data?.results.length;
  const movie = data?.results[safeIndex];

  const { original_title, backdrop_path, overview, release_date, id } = movie;

  return (
    <main className="flex justify-center items-center flex-col">
      <div className="relative cursor-pointer group transition hover:scale-105 ease-in-out duration-600 h-[40vh] md:h-[75vh] w-full overflow-hidden bg-black">
        <Link to={`/movie/${id}`}>
          <img
            src={
              backdrop_path
                ? `https://image.tmdb.org/t/p/original/${backdrop_path}`
                : "no img"
            }
            alt={`${original_title} image`}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col gap-2 md:gap-4">
            <h1 className="text-white text-2xl md:text-4xl font-bold font-serif leading-tight">
              {original_title || "N/A"}
            </h1>
            <p className="text-gray-300 text-base md:text-lg font-medium">
              {release_date || "N/A"}
            </p>
            <p className="hidden md:block text-white/90 text-base md:text-lg max-w-2xl line-clamp-3">
              {overview
                ? overview.split(" ").length > 27
                  ? overview.split(" ").slice(0, 27).join(" ") + "..."
                  : overview
                : "N/A"}
            </p>
          </div>
        </Link>
      </div>

      <button
        onClick={handleRefresh}
        disabled={isFetching}
        className="group cursor-pointer text-white text-3xl mb-5 mt-8 border border-white/30 rounded-4xl px-5 dice transition duration-400 hover:scale-105"
      >
        {isFetching ? (
          "Loading.."
        ) : (
          <>
            Random movie
            <span className="inline-block transition-transform duration-1000 group-hover:rotate-280 ease-in-out">
              🎲
            </span>
          </>
        )}
      </button>
    </main>
  );
}
