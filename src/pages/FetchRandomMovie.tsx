import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchRandomMovie } from "../components/ApiFetchRandomMovie";

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

  const { original_title, backdrop_path } = movie;

  return (
    <div className="flex justify-center items-center flex-col">
      <div>
        <img
          src={
            backdrop_path
              ? `https://image.tmdb.org/t/p/original/${backdrop_path}`
              : "no img"
          }
          alt={`${original_title} image`}
          className="w-full h-[40vh] md:h-[75vh] object-contain"
        />
        <p>{original_title}</p>
      </div>

      <button
        onClick={handleRefresh}
        disabled={isFetching}
        className="cursor-pointer bg-gray-500 p-3 rounded-xl font-bold"
      >
        {isFetching ? "Loading.." : "Random movie"}
      </button>
    </div>
  );
}
