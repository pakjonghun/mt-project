import { Paths } from "./../../../router/types";
import { useAppSelector } from "./../../../hooks/reduxHooks";
import { useGetMiddlePath } from "./../../Carocel/hooks/hooks";
import { useParams } from "react-router-dom";
import { is } from "immer/dist/internal";

type FindItem = {
  id: number;
  title?: string;
  name?: string;
  vote_average?: number;
  backdrop_path: string;
};

export const useFindItem = () => {
  const { id } = useParams();
  const path = useGetMiddlePath();

  const findItem = (state: FindItem[]) =>
    id && state.find((item) => item.id === +id);

  const item = useAppSelector((state) => {
    if (path == null) return;
    if (path.some((p) => p === Paths.movies)) return findItem(state.movie);
    if (path.some((p) => p === Paths.tvs)) return findItem(state.tv);
    if (path.some((p) => p === Paths.movie)) return findItem(state.movie);
    if (path.some((p) => p === Paths.tv)) return findItem(state.tv);
  });

  return { item, id, path };
};
