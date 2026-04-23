import type { MovieDetailsResponse, MovieResponse } from "../types/movieTypes";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export async function fetchRandomMovie(page: number): Promise<MovieResponse> {
  const randomMovie = `${API_BASE_URL}/discover/movie?include_adult=false&sort_by=popularity.desc&page=${page}`;
  const res = await fetch(randomMovie, API_OPTIONS);

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
}

export async function fetchPopular(): Promise<MovieResponse> {
  const popularResult = `${API_BASE_URL}/movie/popular`;
  const res = await fetch(popularResult, API_OPTIONS);

  if (!res.ok) {
    throw new Error("failed popular");
  }

  return res.json();
}

export async function fetchMovieDetails(
  id: string | number,
): Promise<MovieDetailsResponse> {
  const movieDetails = `${API_BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`;
  const res = await fetch(movieDetails, API_OPTIONS);

  if (!res.ok) {
    throw new Error("failed details");
  }

  return res.json();
}

export async function fetchSearchMovie(query: string) {
  if (!query) return [];

  const searchMovie = `${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
  const res = await fetch(searchMovie, API_OPTIONS);

  if (!res.ok) {
    throw new Error("Search Error");
  }

  return res.json();
}
