export type TMDBData<T> = {
  success?: boolean;
  status_message?: string;
  status_code?: number;
  dates: object;
  page: number;
  results: T;
  total_pages: number;
  total_results: number;
};

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: object;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TV = {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: object;
  id: number;
  name: string;
  origin_country: object;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

export interface BasicData {
  success?: boolean;
  status_message?: string;
  status_code?: number;
  results?: any;
}

export type MovieDetail = {
  success?: boolean;
  status_message?: string;
  status_code?: number;
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: object;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: object;
  production_countries: object;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: object;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type Warning = {
  code?: number;
  message?: string;
};

export type Video = {
  name: string;
  key: string;
};
