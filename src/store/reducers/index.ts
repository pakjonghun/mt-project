import { combineReducers } from "@reduxjs/toolkit";
import movie from "./movie";
import tv from "./tv";

const rootReducer = combineReducers({
  movie,
  tv,
});

export default rootReducer;
