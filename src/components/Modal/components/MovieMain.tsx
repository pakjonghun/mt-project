import React from "react";
import Loading from "../../Loading";
import { useGetMovieDetail, useGetMovieVideo } from "../hooks/useGetData";
import MainInfo from "./MainIInfo";

interface MovieMainProps {
  id: string;
}

const MovieMain: React.FC<MovieMainProps> = ({ id }) => {
  const { isLoading: MLoading, data: MData } = useGetMovieDetail(id);
  const { isLoading: VLoading, data: VData } = useGetMovieVideo(+id);

  if (MLoading || VLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!MData || !VData?.results) return <></>;

  const data = {
    ...MData,
    released: MData?.release_date,
    video: VData?.results?.[0],
  };

  return <MainInfo data={data} />;
};

export default MovieMain;
