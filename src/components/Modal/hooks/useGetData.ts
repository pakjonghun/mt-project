import { checkWarning } from "./../../../utilities/utility";
import { BasicData, MovieDetail, Video } from "./../../../apis/types";
import { movieApis, tvApis } from "./../../../apis/api";
import { queryKeys } from "./../../../reactQuery/constants";
import { useQuery } from "react-query";

export const useGetMovieDetail = (id: string) => {
  const movieDetail = useQuery<MovieDetail>(
    [queryKeys.movie, queryKeys.detail, id],
    () => movieApis.detail(id),
    { onSuccess: checkWarning }
  );
  return movieDetail;
};

export const useGetTvDetail = (id?: string) => {
  const tvDetail = useQuery(
    [queryKeys.tv, queryKeys.detail, id],
    () => tvApis.detail(id),
    {
      onSuccess: checkWarning,
    }
  );
  return tvDetail;
};

interface VideoMergeType extends BasicData {
  results?: Video[];
}

export const useGetMovieVideo = (id: number) => {
  const movieVideo = useQuery<VideoMergeType>(
    [queryKeys.movie, queryKeys.video, id],
    () => movieApis.video(id),
    {
      onSuccess: checkWarning,
    }
  );
  return movieVideo;
};

export const useGetTvVideo = (id: number) => {
  const tvVideo = useQuery(
    [queryKeys.tv, queryKeys.video, id],
    () => tvApis.video(id),
    {
      onSuccess: checkWarning,
    }
  );
  return tvVideo;
};
