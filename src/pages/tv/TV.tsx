import React, { useState } from "react";
import { useGetTV } from "./hooks/tvHooks";
import Loading from "../../components/Loading";
import Banner from "../../components/Banner";
import Carocel from "../../components/Carocel";
import Modal from "../../components/Modal/Modal";
import { Paths } from "../../router/types";
import SwitchButtons from "./components/SwitchButtons";
import { Helmet } from "react-helmet-async";

const TV = () => {
  const pageState = useState(1);
  const { data, isLoading } = useGetTV(pageState[0]);
  const bannerData = data?.results[0];

  const keyChanged = data?.results.map((tv) => ({ ...tv, title: tv.name }));

  return (
    <>
      <Helmet>
        <title>TV</title>
      </Helmet>
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
              title={bannerData?.name}
              image={bannerData?.backdrop_path}
              overview={bannerData?.overview}
            />
            {keyChanged && (
              <Carocel
                path={`${Paths.tvs}/${Paths.detail}`}
                data={keyChanged}
              />
            )}
          </div>
        )}
      </main>
      <Modal />
    </>
  );
};

export default TV;
