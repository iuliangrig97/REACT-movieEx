import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { fetchMovieDetails } from "../components/ApiFetchMovie";
import type { MovieDetailsResponse } from "../types/movieTypes.tsx";

export default function MovieDetails() {
  const { id } = useParams();

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery<MovieDetailsResponse>({
    queryKey: ["movieDetails", id],
    queryFn: () => {
      if (!id) throw new Error("Movie ID is required");
      return fetchMovieDetails(id);
    },
  });

  if (isLoading || !movie) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const trailer = movie.videos?.results.find(
    (vid) => vid.site === "YouTube" && vid.type === "Trailer",
  );

  const {
    original_title,
    release_date,
    poster_path,
    vote_average,
    vote_count,
    tagline,
    genres,
    director,
  } = movie;

  return (
    <main>
      <div className="mx-auto flex flex-col items-center">
        <Link
          to={"/"}
          className="cursor-pointer text-2xl bg-amber-50 rounded-2xl p-2 my-4 hover:scale-110"
        >
          🔙
        </Link>
        <div className="text-white flex flex-col items-center text-center mt-12">
          <div className="flex flex-col xl:flex-row gap-5 xl:gap-20 items-center">
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w300/${poster_path}`
                  : "no img"
              }
              alt={original_title}
              className="w-[60vw] md:w-[50vw] xl:w-full h-auto xl:h-[60vh] object-cover rounded-lg shadow-md"
            />
            <div className="flex flex-col justify-between items-center gap-4">
              <div className="flex gap-2 text-2xl flex-col md:flex-row md:text-4xl font-bold">
                <h3>{original_title}</h3>
                <p>({release_date ? release_date.split("-")[0] : "N/A"})</p>
              </div>
              <div className="flex flex-row gap-2 text-1xl md:text-2xl">
                <p>⭐</p>
                <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
                <p> 👥{vote_count}</p>
              </div>
              {trailer && (
                <iframe
                  className="w-[80vw] xl:w-3xl aspect-video"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-12 text-1xl md:text-3xl font-bold">
            <p>{tagline}</p>
            {director && <p>🎥 Directed by: {director.name}</p>}
          </div>
          <div className="flex my-6 gap-8 text-1xl">
            <div>
              <p>Genres: </p>
              {genres && genres.length > 0 && (
                <div>
                  {genres.map((genre) => (
                    <p key={genre.id}>* {genre.name}</p>
                  ))}
                </div>
              )}
            </div>
            <div>
              <h3>Actors:</h3>
              {movie.credits?.cast.slice(0, 7).map((actor) => (
                <div key={actor.id}>{actor.name}</div>
              ))}
            </div>
          </div>
          <p className="max-w-[75vw] mt-6 mb-12 text-1xl md:text-2xl">
            {movie.overview}
          </p>
        </div>
      </div>
    </main>
  );
}
