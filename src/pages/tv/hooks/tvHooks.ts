import { useEffect } from "react";
import { tvApis } from "../../../apis/api";
import { useQuery } from "react-query";
import { queryKeys } from "../../../reactQuery/constants";
import { movieApis } from "../../../apis/api";
import { usePreFetch } from "../../../hooks/reactQueryHooks";
import { checkWarning } from "../../../utilities/utility";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { TMDBData, TV } from "../../../apis/types";
import { tvSave } from "../../../store/reducers/tv";

export const useGetTV = (page: number = 1) => {
  const dispatch = useAppDispatch();

  const { isLoading, data } = useQuery<TMDBData<TV[]>>(
    [queryKeys.tv, page],
    () => tvApis.topRated(page),
    {
      onSuccess: (data) => {
        checkWarning(data);
        // data.results?.length && dispatch(tvSave(data.results));
      },
    }
  );

  useEffect(() => {
    data?.results?.length && dispatch(tvSave(data.results));
  }, [data, dispatch]);

  usePreFetch({
    key: queryKeys.tv,
    page: page + 1,
    api: tvApis.topRated,
  });

  return { isLoading, data };
};
