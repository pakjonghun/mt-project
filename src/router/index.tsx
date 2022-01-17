import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Main from "../pages/main/Main";
import Movie from "../pages/movie";
import TV from "../pages/tv";
import { KeyRouters } from "./types";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={KeyRouters.home} element={<Header />}>
          <Route path="" element={<Main />} />
          <Route path={KeyRouters.movies} element={<Movie />} />
          <Route path={KeyRouters.tvs} element={<TV />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
