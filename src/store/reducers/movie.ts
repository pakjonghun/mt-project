import { Movie } from "./../../apis/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import image from "../../images/empty.jpg";

const initialState: Movie[] = [];

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    movieSave: (_, { payload }: PayloadAction<Movie[]>) => payload,
    movieInfinity: (state, { payload }: PayloadAction<Movie[]>) => {
      return [...state, ...payload];
    },
    resetMovie: () => {
      return [];
    },
  },
});

export const { movieInfinity, movieSave, resetMovie } = movieSlice.actions;
export default movieSlice.reducer;
