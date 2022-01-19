import React from "react";
import { motion } from "framer-motion";
import SwitchButton from "../../../components/SwitchButton";
import useHideByScroll from "../../../hooks/scrollHooks";

interface SwitchProps {
  pageState: [number, React.Dispatch<React.SetStateAction<number>>];
  totalPage?: number;
}

const Switch: React.FC<SwitchProps> = ({ pageState, totalPage }) => {
  const [page, setPage] = pageState;
  const buttonOpacity = useHideByScroll(60, 80);

  const onNextClick = () => setPage(page + 1);
  const onPreClick = () => setPage(page - 1);

  if (!totalPage) return <></>;

  return (
    <motion.div
      style={{ opacity: buttonOpacity }}
      className="absolute top-10 right-5 text-right"
    >
      <SwitchButton onClick={onPreClick} disabled={page > 1} title={"Prev"} />
      <SwitchButton
        onClick={onNextClick}
        disabled={page < totalPage}
        title={"Next"}
      />
    </motion.div>
  );
};

export default Switch;
