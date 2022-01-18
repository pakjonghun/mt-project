import React from "react";
import { useGetMovie, useGetTV } from "./hooks/mainHooks";
import SwitchButtons from "./components/SwitchButtons";
import Loading from "../../components/Loading";
import Banners from "./components/Banners";
import Carocel from "../../components/Carocel";
import Modal from "../../components/Modal/Modal";
import { Paths } from "../../router/types";

const Main = () => {
  const [isMovie, setIsMovie] = React.useState(true);

  const { data: Mdata, isLoading: Mloading } = useGetMovie();
  const { data: Tdata, isLoading: Tloading } = useGetTV();
  const changeTvKey = Tdata?.results.map((tv) => ({ ...tv, title: tv.name }));

  return (
    <>
      <main className="relative">
        {Mloading || Tloading ? (
          <div className="flex items-center justify-center h-screen">
            <Loading />
          </div>
        ) : (
          <div className="bg-black h-full">
            <SwitchButtons isMovie={isMovie} setIsMovie={setIsMovie} />
            <Banners isMovie={isMovie} />
            {Mdata?.results && (
              <Carocel path={Paths.home} data={Mdata?.results} />
            )}
            {changeTvKey && <Carocel path={Paths.home} data={changeTvKey} />}
          </div>
        )}
      </main>
      <Modal isMovie={isMovie} />
    </>
  );
};

export default Main;
