import React from "react";
import { useParams } from "react-router-dom";
import { Movie, TV } from "../../apis/types";
import { useAppSelector } from "../../hooks/reduxHooks";
import PreInfo from "./components/PreInfo";
import ModalWrapper from "./ModalWrapper";

interface ModalProps {
  isMovie: boolean;
}

const Modal: React.FC<ModalProps> = ({ isMovie }) => {
  const { id } = useParams();

  const findItem = (state: { id: number }[]) =>
    id && state.find((item) => item.id === +id);

  const item = useAppSelector((state) =>
    isMovie ? findItem(state.movie) : findItem(state.tv)
  );

  console.log(item);

  return (
    <ModalWrapper id={id}>
      <div>
        <PreInfo />
      </div>
    </ModalWrapper>
  );
};

export default Modal;
