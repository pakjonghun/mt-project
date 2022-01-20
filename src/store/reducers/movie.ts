import { Movie } from "./../../apis/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import image from "../../images/empty.jpg";

const initialState: Movie[] = [
  {
    backdrop_path: image,
    id: 1,
    original_title: "",
    overview: "",
    release_date: "",
    title: "",
    vote_average: 1,
  },
];

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    movieSave: (_, { payload }: PayloadAction<Movie[]>) => payload,
    movieInfinity: (state, { payload }: PayloadAction<Movie[]>) => {
      return [...state, ...payload];
    },
  },
});

export const { movieInfinity, movieSave } = movieSlice.actions;
export default movieSlice.reducer;
