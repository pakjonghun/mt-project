import React from "react";
import Loading from "../../Loading";
import MainInfo from "./MainIInfo";
import { useGetTvDetail, useGetTvVideo } from "../hooks/useGetData";

interface TVMainProps {
  id: string;
}

const MovieMain: React.FC<TVMainProps> = ({ id }) => {
  const { isLoading: MLoading, data: MData } = useGetTvDetail(id);
  const { isLoading: VLoading, data: VData } = useGetTvVideo(+id);

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
