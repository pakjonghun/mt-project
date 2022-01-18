import React, { useLayoutEffect, useState } from "react";
import { animation } from "../animation";
import { AnimatePresence, motion } from "framer-motion";

interface CarocelWrapperProps {
  slider: {
    index: number;
    direction: number;
    isSliding: boolean;
    setIsSliding: React.Dispatch<React.SetStateAction<boolean>>;
    switchHandler: (direction: number) => void;
  };
  response: {
    count: number;
    imgPadding: string;
  };
  dataLength: number;
}

const CarocelWrapper: React.FC<CarocelWrapperProps> = ({
  slider,
  response,
  dataLength,
  children,
}) => {
  const { index, direction, isSliding, setIsSliding, switchHandler } = slider;
  const { count, imgPadding } = response;
  const [isOnAni, setIsOnAnt] = useState(false);
  const max = Math.ceil((dataLength - 2) / count);

  useLayoutEffect(() => {
    setIsOnAnt(true);
  }, []);

  return (
    <motion.div
      style={{ paddingBottom: imgPadding }}
      className="relative grid grid-cols-12 gap-3 w-full mb-10 px-10"
    >
      <button
        disabled={index === 1}
        onClick={() => switchHandler(-1)}
        className={`absolute left-4 top-1/2 bg-stone-500/20 -translate-y-1/2 w-5 h-full font-bold text-stone-400 cursor-pointer hover:scale-105 active:scale-100 transition-all duration-100 ease-linear z-10 ${
          isSliding ? "opacity-0" : "opacity-100"
        }`}
      >
        〈
      </button>
      <AnimatePresence
        initial={true}
        custom={direction}
        onExitComplete={() => setIsSliding(false)}
      >
        <motion.div
          key={index}
          custom={direction}
          variants={animation}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ gridTemplateColumns: `repeat(${count},1fr)` }}
          className="absolute grid gap-4 col-span-10 place-content-center px-10"
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <button
        disabled={index === max}
        onClick={() => switchHandler(1)}
        className={`absolute right-4 top-1/2 bg-stone-500/20 -translate-y-1/2 w-5 h-full font-bold text-stone-400 cursor-pointer hover:scale-105 active:scale-100 transition-all duration-100 ease-linear z-10 ${
          isSliding ? "opacity-0" : "opacity-100"
        }`}
      >
        〉
      </button>
    </motion.div>
  );
};

export default CarocelWrapper;
