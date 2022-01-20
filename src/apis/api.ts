import { MOVIE_URL, TV_URL, API_PARAM, BASIC_URL } from "./constants";

const getData = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

export const movieApis = {
  nowPlaying: (page: number = 1) =>
    getData(`${MOVIE_URL}/now_playing${API_PARAM}&adult=${false}&page=${page}`),
  topRated: (page: number = 1) =>
    getData(`${MOVIE_URL}/top_rated${API_PARAM}&adult=${false}&page=${page}`),
  detail: (id: string) => getData(`${MOVIE_URL}/${id}${API_PARAM}`),
  video: (id: number) => getData(`${MOVIE_URL}/${id}/videos${API_PARAM}`),
};

export const tvApis = {
  onTheAir: (page: number = 1) =>
    getData(`${TV_URL}/on_the_air${API_PARAM}&page=${page}`),
  topRated: (page: number = 1) =>
    getData(`${TV_URL}/top_rated${API_PARAM}&adult=${false}&page=${page}`),
  detail: (id?: string) => getData(`${TV_URL}/${id}${API_PARAM}`),
  video: (id: number) => getData(`${TV_URL}/${id}/videos${API_PARAM}`),
};

type SearchTarget = "movie" | "tv" | "multi";
export const search = (
  term: string,
  searchTarget: SearchTarget,
  { pageParam = 1 }
) => {
  const url = `${BASIC_URL}/search/${searchTarget}/${API_PARAM}&include_adult=${false}&query=${term}&page=${pageParam}`;
  return getData(url);
};
