import React from "react";
import { motion } from "framer-motion";
import SwitchButton from "../../../components/SwitchButton";
import useHideByScroll from "../../../hooks/scrollHooks";

interface SwitchProps {
  isMovie: boolean;
  setIsMovie: React.Dispatch<React.SetStateAction<boolean>>;
}

const Switch: React.FC<SwitchProps> = ({ isMovie, setIsMovie }) => {
  const buttonOpacity = useHideByScroll(60, 80);

  const onClick = () => setIsMovie(!isMovie);
  return (
    <motion.div
      style={{ opacity: buttonOpacity }}
      className="absolute top-10 right-5 text-right"
    >
      <SwitchButton onClick={onClick} disabled={!isMovie} title={"Movie"} />
      <SwitchButton onClick={onClick} disabled={isMovie} title={"TV"} />
    </motion.div>
  );
};

export default Switch;
