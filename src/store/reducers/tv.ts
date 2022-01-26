import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TV } from "../../apis/types";

const initialState: TV[] = [];

const tvSlice = createSlice({
  name: "tv",
  initialState,
  reducers: {
    tvSave: (_, { payload }: PayloadAction<TV[]>) => payload,
    tvInfinity: (state, { payload }: PayloadAction<TV[]>) => {
      return [...state, ...payload];
    },
  },
});

export const { tvSave, tvInfinity } = tvSlice.actions;
export default tvSlice.reducer;
