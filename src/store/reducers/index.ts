import { combineReducers } from "@reduxjs/toolkit";
import movie from "./movie";

const rootReducer = combineReducers({
  movie,
});

export default rootReducer;
