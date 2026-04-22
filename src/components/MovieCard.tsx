export default function MovieCard({ original_title, poster_path }) {
  return (
    <div className="flex justify-center items-center flex-col text-center">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w200/${poster_path}`
            : "no img"
        }
        alt={original_title}
      />
      <p>{original_title}</p>
    </div>
  );
}
