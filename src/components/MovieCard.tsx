import { Link } from "react-router-dom";
import type { Movie } from "../types/movieTypes";

export default function MovieCard({ original_title, poster_path, id }: Movie) {
  return (
    <Link
      to={`/movie/${id}`}
      className="hover:scale-105 duration-400 ease-in-out"
    >
      <div className="flex justify-center items-center flex-col text-center">
        {poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
            alt={original_title}
          />
        ) : (
          <span className="text-xs text-gray-500">No Poster Available</span>
        )}
        <p className="font-bold">{original_title}</p>
      </div>
    </Link>
  );
}
