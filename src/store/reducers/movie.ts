import { Movie } from "./../../apis/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import image from "../../images/empty.jpg";

const initialState: Movie[] = [
  {
    adult: false,
    backdrop_path: image,
    genre_ids: [1],
    id: 1,
    original_language: "",
    original_title: "",
    overview: "",
    popularity: 1,
    poster_path: "",
    release_date: "",
    title: "",
    video: false,
    vote_average: 1,
    vote_count: 1,
  },
];

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    movieSave: (state, { payload }: PayloadAction<Movie[]>) => {
      return [...state, ...payload];
    },
  },
});

export const { movieSave } = movieSlice.actions;
export default movieSlice.reducer;
