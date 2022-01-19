import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Main from "../pages/Main";
import Movie from "../pages/movie";
import Search from "../pages/Search";
import TV from "../pages/tv";
import { Paths } from "./types";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Paths.home} element={<Header />}>
          <Route path={Paths.search} element={<Search />} />
          <Route path="" element={<Main />}>
            <Route path="movies/:id" element={<Main />} />
            <Route path="tvs/:id" element={<Main />} />
          </Route>

          <Route path={Paths.movies} element={<Movie />}>
            <Route path="detail/:id" element={<Movie />} />
          </Route>

          <Route path={Paths.tvs} element={<TV />}>
            <Route path="detail/:id" element={<TV />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
