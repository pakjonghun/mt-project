import { Movie } from "./../../apis/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Movie[] = [];

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    movieSave: (_, { payload }: PayloadAction<Movie[]>) => payload,
    movieInfinity: (state, { payload }: PayloadAction<Movie[]>) => {
      console.log([...state, ...payload]);
      return [...state, ...payload];
    },
    resetMovie: () => {
      return [];
    },
  },
});

export const { movieInfinity, movieSave, resetMovie } = movieSlice.actions;
export default movieSlice.reducer;
