import React from "react";
import SwitchButton from "./SwitchButton";

interface SwitchProps {
  isMovie: boolean;
  setIsMovie: React.Dispatch<React.SetStateAction<boolean>>;
}

const Switch: React.FC<SwitchProps> = ({ isMovie, setIsMovie }) => {
  const onClick = () => setIsMovie(!isMovie);
  return (
    <div className="absolute top-10 right-5 text-right">
      <SwitchButton onClick={onClick} isMovie={!isMovie} title={"Movie"} />
      <SwitchButton onClick={onClick} isMovie={isMovie} title={"TV"} />
    </div>
  );
};

export default Switch;
