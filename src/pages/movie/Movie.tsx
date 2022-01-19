import React, { useState } from "react";
import { useGetMovie } from "./hooks/movieHooks";
import Loading from "../../components/Loading";
import Banner from "../../components/Banner";
import Carocel from "../../components/Carocel";
import Modal from "../../components/Modal/Modal";
import { Paths } from "../../router/types";
import SwitchButtons from "./components/SwitchButtons";

const Movie = () => {
  const pageState = useState(1);
  const { data, isLoading } = useGetMovie(pageState[0]);
  const bannerData = data?.results[0];

  return (
    <>
      <main className="relative">
        {isLoading ? (
          <div className="flex items-center justify-center h-screen">
            <Loading />
          </div>
        ) : (
          <div className="bg-black h-full">
            <SwitchButtons
              pageState={pageState}
              totalPage={data?.total_pages}
            />
            <Banner
              title={bannerData?.title}
              image={bannerData?.backdrop_path}
              overview={bannerData?.overview}
            />
            {data?.results && (
              <Carocel
                path={`${Paths.movies}/${Paths.detail}`}
                data={data?.results}
              />
            )}
          </div>
        )}
      </main>
      <Modal />
    </>
  );
};

export default Movie;
