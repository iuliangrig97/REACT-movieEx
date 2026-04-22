import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

async function fetchRandomMovie(page: number) {
  const randomMovie = `${API_BASE_URL}/discover/movie?include_adult=false&sort_by=popularity.desc&page=${page}`;
  const res = await fetch(randomMovie, API_OPTIONS);

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
}

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
    <div>
      <img
        src={
          backdrop_path
            ? `https://image.tmdb.org/t/p/original/${backdrop_path}`
            : "no img"
        }
        alt={`${original_title} image`}
      />
      <p>{original_title}</p>

      <button onClick={handleRefresh} disabled={isFetching} className="cursor-pointer">
        {isFetching ? "Loading.." : "Random movie"}
      </button>
    </div>
  );
}
