import { useAppDispatch } from "./../../../hooks/reduxHooks";
import { useEffect } from "react";
import { checkWarning } from "../../../utilities/utility";
import { queryKeys } from "../../../reactQuery/constants";
import { TMDBData, Movie, TV } from "../../../apis/types";
import { movieApis, tvApis } from "../../../apis/api";
import { useQuery } from "react-query";
import { movieSave } from "../../../store/reducers/movie";
import { tvSave } from "../../../store/reducers/tv";

export const useGetMovie = () => {
  const dispatch = useAppDispatch();

  const { isLoading, data } = useQuery<TMDBData<Movie[]>>(
    [queryKeys.movie],
    () => movieApis.nowPlaying(),
    {
      onSuccess: (data) => {
        checkWarning(data);
      },
    }
  );

  useEffect(() => {
    data?.results?.length &&
      dispatch(
        movieSave(data.results.map((i) => ({ ...i, media_type: "movie" })))
      );
  }, [dispatch, data?.results]);

  return { isLoading, data };
};

export const useGetTV = () => {
  const dispatch = useAppDispatch();

  const { isLoading, data } = useQuery<TMDBData<TV[]>>(
    [queryKeys.tv],
    () => tvApis.onTheAir(),
    {
      onSuccess: (data) => {
        checkWarning(data);
      },
    }
  );

  useEffect(() => {
    data?.results?.length &&
      dispatch(tvSave(data.results.map((i) => ({ ...i, media_type: "tv" }))));
  }, [dispatch, data?.results]);

  return { isLoading, data };
};
