import React from "react";
import { useGetMovie, useGetTV } from "./hooks/mainHooks";
import SwitchButtons from "./components/SwitchButtons";
import Loading from "../../components/Loading";
import Banners from "../../components/Banners";
import Carocel from "../../components/Carocel";
import Modal from "../../components/Modal/Modal";
import { Paths } from "../../router/types";
import HelmetAsync from "../../components/HelmetAsync";
import { useStoreReset } from "../../hooks/resetComponent";

const Main = () => {
  const [isMovie, setIsMovie] = React.useState(true);

  useStoreReset("all");
  const { data: Mdata, isLoading: Mloading } = useGetMovie();
  const { data: Tdata, isLoading: Tloading } = useGetTV();
  const changeTvKey = Tdata?.results.map((tv) => ({ ...tv, title: tv.name }));
  if (Mloading || Tloading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <HelmetAsync title="Main" />
      <main className="relative">
        <div className="bg-black h-full">
          <SwitchButtons isMovie={isMovie} setIsMovie={setIsMovie} />
          <Banners isMovie={isMovie} />
          {Mdata?.results && (
            <Carocel path={Paths.movies} data={Mdata?.results} />
          )}
          {changeTvKey && <Carocel path={Paths.tvs} data={changeTvKey} />}
        </div>
      </main>
      <Modal />
    </>
  );
};

export default Main;
