import React from "react";
import SwitchButtons from "./components/SwitchButtons";
import { useGetMovie, useGetTV } from "./hooks/mainHooks";
import Loading from "../../components/Loading";
import Banners from "./components/Banners";

const Main = () => {
  const [isMovie, setIsMovie] = React.useState(true);

  const movieData = useGetMovie();
  const tvData = useGetTV();

  return (
    <main className="relative min-h-screen">
      {movieData.isLoading || tvData.isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Loading />
        </div>
      ) : (
        <>
          <SwitchButtons isMovie={isMovie} setIsMovie={setIsMovie} />
          <Banners isMovie={isMovie} />
          {/* <Carocel /> */}
        </>
      )}
    </main>
  );
};

export default Main;
