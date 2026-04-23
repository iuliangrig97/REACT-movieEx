import { Link } from "react-router-dom";
import type { Movie } from "../types/movieTypes";

interface MovieCardProp extends Movie {
  index: number;
}

export default function TrendingMovies({
  original_title,
  poster_path,
  index,
  id,
}: MovieCardProp) {
  return (
    <Link
      to={`/movie/${id}`}
      className="hover:scale-105 duration-400 ease-in-out"
    >
      <div className="p-6 relative flex justify-center items-center ml-6">
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w200/${poster_path}`
              : "no img"
          }
          alt={original_title}
          className="relative z-1 shadow-[-40px_0_60px_-15px_rgba(0,0,0,95)]"
        />

        <p
          className={
            [9, 10, 11].includes(index)
              ? "text-9xl absolute bottom-5 left-[-25%]  text-gray-400 tracking-[-1.4rem]"
              : "text-9xl absolute bottom-5 left-[-13%] text-gray-400"
          }
        >
          {index + 1}
        </p>
      </div>
    </Link>
  );
}
