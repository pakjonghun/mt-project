import React from "react";
import { Paths } from "../../router/types";
import MovieMain from "./components/MovieMain";
import PreInfo from "./components/PreInfo";
import TVMain from "./components/TVMain";
import { useFindItem } from "./hooks/hooks";
import ModalWrapper from "./ModalWrapper";

interface ModalProps {}

const Modal: React.FC<ModalProps> = () => {
  const { item, id, path } = useFindItem();
  if (!item || !id) return null;
  return (
    <ModalWrapper id={id}>
      <PreInfo
        title={item.title || item.name}
        image={item.backdrop_path}
        vote={item.vote_average}
      />
      {path === Paths.movies && <MovieMain id={id} />}
      {path === Paths.tvs && <TVMain id={id} />}
    </ModalWrapper>
  );
};

export default Modal;
