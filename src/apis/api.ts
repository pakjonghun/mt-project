import { BASIC_URL } from "./constants";
const key = process.env.REACT_APP_KEY;

const getData = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

export const movieApis = {
  nowPlaying: (page: number = 1) =>
    getData(
      `${BASIC_URL}/movie/now_playing?api_key=${key}&adult=${false}&page=${page}`
    ),
  detail: (id: number) => {
    getData(`${BASIC_URL}/movie/${id}?api_key=${key}`);
  },
};

export const tvApis = {
  onTheAir: (page: number = 1) =>
    getData(`${BASIC_URL}/tv/on_the_air?api_key=${key}&page=${page}`),
  detail: (id: number) => {
    getData(`${BASIC_URL}/tv/${id}?api_key=${key}`);
  },
};
