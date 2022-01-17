import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import image from "../../images/empty.jpg";

type Movie = {
  title: string;
  image: string;
};

const initialState = [
  {
    title: "title",
    image,
  },
];

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    carocel: (state, action: PayloadAction<Movie>) => {
      state.push(action.payload);
    },
  },
});

export const { carocel } = movieSlice.actions;
export default movieSlice.reducer;
