import { useEffect } from "react";
import { useQuery } from "react-query";
import { queryKeys } from "../../../reactQuery/constants";
import { movieApis } from "../../../apis/api";
import { movieSave } from "../../../store/reducers/movie";
import { usePreFetch } from "../../../hooks/reactQueryHooks";
import { checkWarning } from "../../../utilities/utility";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { TMDBData, Movie } from "../../../apis/types";

export const useGetMovie = (page: number = 1) => {
  const dispatch = useAppDispatch();

  const { isLoading, data } = useQuery<TMDBData<Movie[]>>(
    [queryKeys.movie, page],
    () => movieApis.topRated(page),
    {
      onSuccess: (data) => {
        checkWarning(data);
      },
    }
  );

  useEffect(() => {
    if (data?.results?.length) {
      const saveData = data?.results.map((i) => ({
        ...i,
        media_type: "movie",
      }));
      dispatch(movieSave(saveData));
    }
  }, [data, dispatch]);

  usePreFetch({
    key: queryKeys.movie,
    page: page + 1,
    api: movieApis.topRated,
  });

  return { isLoading, data };
};
