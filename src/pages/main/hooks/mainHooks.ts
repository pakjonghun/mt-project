import { queryKeys } from "./../../../reactQuery/constants";
import { TMDBData, Movie, TV } from "./../../../apis/types";
import { movieApis, tvApis } from "./../../../apis/api";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { useQuery } from "react-query";
import { movieSave } from "../../../store/reducers/movie";
import { tvSave } from "../../../store/reducers/tv";
import { createStandaloneToast, UseToastOptions } from "@chakra-ui/react";

type Warning = {
  code?: number;
  message?: string;
};

const querySuccessHandler = (warning: Warning) => {
  const toast = createStandaloneToast();
  const options: UseToastOptions = {
    title: warning.code,
    description: warning.message,
    status: "warning",
  };

  toast.closeAll();
  toast(options);
};

const checkWarning = (data: TMDBData<Movie[]> | TMDBData<TV[]>) => {
  if (data.status_code && data.status_message) {
    querySuccessHandler({
      code: data.status_code,
      message: data.status_message,
    });
  }
};

export const useGetMovie = () => {
  const dispatch = useAppDispatch();

  const { isLoading, data } = useQuery<TMDBData<Movie[]>>(
    [queryKeys.movie],
    () => movieApis.nowPlaying(),
    {
      onSuccess: (data) => {
        checkWarning(data);
        data.success ?? dispatch(movieSave(data.results));
      },
    }
  );

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
        data.success ?? dispatch(tvSave(data.results));
      },
    }
  );

  return { isLoading, data };
};
