import React from "react";
import Banner from "./components/Banner";
import { useGetMovie, useGetTV } from "./hooks/mainHooks";

const Main = () => {
  const movieData = useGetMovie();
  const tvData = useGetTV();
  console.log(tvData.data);
  return (
    <main>
      {/* <Banner /> */}
      {/* <Carocel /> */}
    </main>
  );
};

export default Main;
