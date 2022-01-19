import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TV } from "../../apis/types";

const initialState: TV[] = [
  {
    backdrop_path: "",
    first_air_date: "",
    genre_ids: [],
    id: 1,
    name: "",
    origin_country: [],
    original_language: "",
    original_name: "",
    overview: "",
    popularity: 1,
    poster_path: "",
    vote_average: 1,
    vote_count: 1,
  },
];

const tvSlice = createSlice({
  name: "tv",
  initialState,
  reducers: {
    tvSave: (_, { payload }: PayloadAction<TV[]>) => payload,
  },
});

export const { tvSave } = tvSlice.actions;
export default tvSlice.reducer;
