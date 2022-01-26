import { useMemo } from "react";
import { SearchTarget } from "./../../Search/Search";
import { useAppSelector } from "./../../../hooks/reduxHooks";
const useGetStoreData = (searchTareget: SearchTarget) => {
  const movies = useAppSelector((state) => state.movie);
  const tvs = useAppSelector((state) => state.tv);
  const contents = useMemo(() => {
    switch (searchTareget) {
      case "movie":
        return movies;
      case "tv":
        return tvs;
      case "multi":
        return [...movies, ...tvs];
      default:
        throw new Error("searchTarget Error");
    }
  }, [movies, tvs, searchTareget]);

  return contents;
};

export default useGetStoreData;
