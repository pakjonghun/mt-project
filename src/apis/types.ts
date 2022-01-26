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
  id: number;
  backdrop_path: string;
  title: string;
  original_title?: string;
  overview: string;
  vote_average: number;
  release_date?: string;
  media_type?: string;
  first_air_date?: string;
};

export type MTType = {
  id: number;
  backdrop_path: string;
  name?: string;
  original_name?: string;
  title?: string;
  original_title?: string;
  overview: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type?: string;
};

export type TV = {
  id: number;
  backdrop_path: string;
  name: string;
  original_name?: string;
  overview: string;
  vote_average: number;
  first_air_date?: string;
  media_type?: string;
  release_date?: string;
};

export type BasicData = {
  success?: boolean;
  status_message?: string;
  status_code?: number;
  results?: any;
};

export type SearchResult = BasicData & {
  results: {
    id: number;
    backdrop_path: string | null;
    first_air_date?: string;
    media_type: string;
    name?: string;
    title?: string;
    overview: string;
    vote_average: number;
  };
  page: number;
  total_pages: number;
};

export type MovieDetail = BasicData & {
  backdrop_path: string;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
};

export type Warning = {
  code?: number;
  message?: string;
};

export type Video = {
  name: string;
  key: string;
};
