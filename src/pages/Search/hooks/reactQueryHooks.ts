import { Paths } from "./../../../router/types";
import { SearchTarget } from "./../Search";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useInfiniteQuery } from "react-query";
import { search } from "../../../apis/api";
import { Movie, MTType, TMDBData, TV } from "./../../../apis/types";
import { checkWarning } from "../../../utilities/utility";
import { movieInfinity } from "../../../store/reducers/movie";
import { tvInfinity } from "../../../store/reducers/tv";

const getMatchData = (temp: any[], searchTarget: SearchTarget) => {
  if (temp) {
    switch (searchTarget) {
      case "movie":
        return [
          movieInfinity(
            temp.map((i) => ({ ...i, media_type: "movie" })) as Movie[]
          ),
        ];
      case "tv":
        return [
          tvInfinity(temp.map((i) => ({ ...i, media_type: "tv" })) as TV[]),
        ];

      case "multi":
        const tvs: TV[] = [];
        const movies: Movie[] = [];
        temp.forEach((item) => {
          if (item.media_type === "tv") tvs.push(item as TV);
          if (item.media_type === "movie") movies.push(item as Movie);
        });
        return [movieInfinity(movies), tvInfinity(tvs)];
      default:
        throw new Error("getMatchData error");
    }
  }
};

export const useGetMovieSearchResult = (
  term: string,
  page: number = 1,
  searchTarget: SearchTarget
) => {
  const dispatch = useDispatch();

  const { isLoading, data, hasNextPage, fetchNextPage, isFetching } =
    useInfiniteQuery<TMDBData<MTType[]>>(
      [Paths.search, term],
      ({ pageParam = page }) => search(term, searchTarget, { pageParam }),
      {
        getNextPageParam: (last) => last.page + 1 || undefined,
        onSuccess: (data) => checkWarning(data.pages[data.pages.length - 1]),
      }
    );

  const temp = data?.pages[data.pages.length - 1].results;
  useEffect(() => {
    if (temp) {
      const contents = getMatchData(temp, searchTarget);
      contents?.forEach((item) => dispatch(item));
    }
  }, [dispatch, temp]);

  return { isLoading, data, hasNextPage, isFetching, fetchNextPage };
};
