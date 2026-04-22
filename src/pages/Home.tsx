import MoreRandomMovies from "./MoreRandomMovies";
import TrendingMovies from "./TrendingMovies";

export default function Home() {
    return (
      <div>
        <TrendingMovies />
        <MoreRandomMovies />
      </div>
    );
}