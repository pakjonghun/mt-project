import React from "react";
import SwitchButtons from "./components/SwitchButtons";
import { useGetMovie, useGetTV } from "./hooks/mainHooks";
import Loading from "../../components/Loading";
import Banners from "./components/Banners";
import Carocel from "../../components/Carocel";

const Main = () => {
  const [isMovie, setIsMovie] = React.useState(true);

  const movieData = useGetMovie();
  const tvData = useGetTV();

  const movies = movieData.data?.results;
  const tvs = tvData.data?.results;
  const changeTvKey = tvs?.map((tv) => ({ ...tv, title: tv.name }));

  return (
    <main className="relative">
      {movieData.isLoading || tvData.isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Loading />
        </div>
      ) : (
        <div className="bg-black h-full">
          <SwitchButtons isMovie={isMovie} setIsMovie={setIsMovie} />
          <Banners isMovie={isMovie} />
          {movies && <Carocel data={movies} />}
          <br />
          {changeTvKey && <Carocel data={changeTvKey} />}
        </div>
      )}
    </main>
  );
};

export default Main;
