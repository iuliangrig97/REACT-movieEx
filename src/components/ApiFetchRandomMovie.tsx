const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export async function fetchRandomMovie(page: number) {
  const randomMovie = `${API_BASE_URL}/discover/movie?include_adult=false&sort_by=popularity.desc&page=${page}`;
  const res = await fetch(randomMovie, API_OPTIONS);

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
}

export async function fetchPopular() {
  const popularResult = `${API_BASE_URL}/movie/popular`;
  const res = await fetch(popularResult, API_OPTIONS);

  if (!res.ok) {
    throw new Error("failed popular");
  }

  return res.json();
}
