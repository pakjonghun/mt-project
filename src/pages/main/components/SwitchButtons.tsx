import React from "react";
import SwitchButton from "./SwitchButton";
import { motion, useViewportScroll, useTransform } from "framer-motion";

interface SwitchProps {
  isMovie: boolean;
  setIsMovie: React.Dispatch<React.SetStateAction<boolean>>;
}

const Switch: React.FC<SwitchProps> = ({ isMovie, setIsMovie }) => {
  const { scrollY } = useViewportScroll();
  const buttonOpacity = useTransform(scrollY, [60, 80], [1, 0]);

  const onClick = () => setIsMovie(!isMovie);
  return (
    <motion.div
      style={{ opacity: buttonOpacity }}
      className="absolute top-10 right-5 text-right"
    >
      <SwitchButton onClick={onClick} isMovie={!isMovie} title={"Movie"} />
      <SwitchButton onClick={onClick} isMovie={isMovie} title={"TV"} />
    </motion.div>
  );
};

export default Switch;
