import React from "react";
import { useAppSelector } from "../hooks/reduxHooks";
import Banner from "./Banner";

interface BannerWrapperProps {
  isMovie: boolean;
}

const BannerWrapper: React.FC<BannerWrapperProps> = ({ isMovie }) => {
  const movie = useAppSelector((state) => state.movie[1]);
  const tv = useAppSelector((state) => state.tv[1]);

  return (
    <>
      {isMovie ? (
        <Banner
          title={movie?.original_title}
          image={movie?.backdrop_path}
          overview={movie?.overview}
        />
      ) : (
        <Banner
          title={tv?.original_name}
          image={tv?.backdrop_path}
          overview={tv?.overview}
        />
      )}
    </>
  );
};

export default BannerWrapper;
