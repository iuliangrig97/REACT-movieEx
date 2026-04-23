export interface Genre {
  id: number;
  name: string;
}

export interface Video {
  id: string;
  key: string;
  site: string;
  type: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
}

export interface Movie {
  id: number;
  original_title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  message: string;
  backdrop_path: string | null;
}

export interface MovieDetailsResponse extends Movie {
  vote_count: number;
  tagline: string;
  genres: Genre[];
  videos?: {
    results: Video[];
  };
  credits?: {
    cast: CastMember[];
  };
  director?: {
    name: string;
  };
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}