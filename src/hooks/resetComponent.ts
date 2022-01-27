import { useAppDispatch } from "./reduxHooks";
import { useEffect } from "react";
import { resetMovie } from "../store/reducers/movie";
import { resetTv } from "../store/reducers/tv";

type resetKey = "tv" | "movie" | "all";
const getResetReducer = (key: resetKey) => {
  switch (key) {
    case "movie":
      return [resetMovie()];

    case "tv":
      return [resetTv()];

    case "all":
      return [resetMovie(), resetTv()];

    default:
      throw new Error("reset key error");
  }
};

export const useStoreReset = (key: resetKey) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      getResetReducer(key).forEach((v) => dispatch(v));
    };
  }, [dispatch, key]);
};
