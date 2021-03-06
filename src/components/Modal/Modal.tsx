import React from "react";
import { Paths } from "../../router/types";
import MovieMain from "./components/MovieMain";
import PreInfo from "./components/PreInfo";
import TVMain from "./components/TVMain";
import { useFindItem } from "./hooks/hooks";
import ModalWrapper from "./ModalWrapper";

const Modal = () => {
  const { item, id, path } = useFindItem();

  if (!item || !id || !path) return null;

  return (
    <ModalWrapper id={id}>
      <PreInfo
        title={item.title || item.name}
        image={item.backdrop_path}
        vote={item.vote_average}
      />
      {path && path.some((p) => p === Paths.movies || p === Paths.movie) && (
        <MovieMain id={id} />
      )}
      {path && path.some((p) => p === Paths.tvs || p === Paths.tv) && (
        <TVMain id={id} />
      )}
    </ModalWrapper>
  );
};

export default Modal;
