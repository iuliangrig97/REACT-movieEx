import { Link } from "react-router-dom";
import type { Movie } from "../types/movieTypes";

export default function MovieCard({ original_title, poster_path, id }: Movie) {
  return (
    <Link
      to={`/movie/${id}`}
      className="hover:scale-105 duration-400 ease-in-out"
    >
      <div className="flex justify-center items-center flex-col text-center">
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w200/${poster_path}`
              : "no img"
          }
          alt={original_title}
        />
        <p className="font-bold">{original_title}</p>
      </div>
    </Link>
  );
}
