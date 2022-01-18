import React, { useEffect, useRef, useState } from "react";
import Item from "./components/Item";
import { AnimatePresence, motion } from "framer-motion";
import useViewPortWidth, { Width } from "../../hooks/useViewportWidth";

const animation = {
  initial: (direction: number) => ({
    x: direction > 0 ? -window.innerWidth + 56 : window.innerWidth - 56,
  }),
  animate: { x: 0, transition: { type: "tween", duration: 1 } },
  exit: (direction: number) => ({
    x: direction > 0 ? window.innerWidth - 56 : -window.innerWidth + 56,
    transition: { type: "tween", duration: 1 },
  }),
};

type item = {
  title: string;
  backdrop_path: string;
  id: number;
};

interface CarocelProps {
  itemCount?: number;
  data: item[];
}
const Carocel: React.FC<CarocelProps> = ({ itemCount = 3, data }) => {
  const [index, setIndex] = useState(1);
  const [direction, setDirection] = useState(1);
  const [count, setCount] = useState(itemCount);
  const [isSliding, setIsSliding] = useState(false);
  const [imgPadding, setImgPadding] = useState("15%");
  const max = Math.ceil((data.length - 2) / count);
  const width = useViewPortWidth();
  useEffect(() => {
    if (width) {
      switch (width) {
        case Width.sm:
          setCount(3);
          setImgPadding("15%");
          break;
        case Width.md:
          setCount(4);
          setImgPadding("12%");
          break;
        case Width.lg:
          setCount(5);
          setImgPadding("10%");
          break;
        case Width.xl:
          setCount(6);
          setImgPadding("8%");
          break;
        case Width["2xl"]:
          setCount(7);
          setImgPadding("7%");
          break;
        default:
          break;
      }
    }
  }, [width]);
  const img = useRef<HTMLImageElement>(null);

  const next = () => {
    if (!isSliding) {
      setIndex(index + 1);
      setIsSliding(true);
      setDirection(1);
    }
  };
  const previous = () => {
    if (!isSliding) {
      setIndex(index - 1);
      setIsSliding(true);
      setDirection(-1);
    }
  };

  const singleSliderData = data.slice(
    2 + (index - 1) * count,
    2 + count + (index - 1) * count
  );

  return (
    <motion.div
      style={{ paddingBottom: imgPadding }}
      className="relative grid grid-cols-12 gap-3 w-full px-10"
    >
      <button
        disabled={index === 1}
        onClick={previous}
        className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-white cursor-pointer hover:scale-125 active:scale-100 transition-all duration-100 ease-linear z-10"
      >
        〈
      </button>
      <AnimatePresence
        initial={false}
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
          {singleSliderData.map((item) => (
            <div
              key={item.id}
              className="relative first:origin-left last:origin-right hover:scale-110 active:scale-100 transition-all duration-150 ease-linear hover:-translate-y-4 group"
            >
              <Item img={img} data={item} />
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
      <button
        disabled={index === max}
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 font-bole text-white cursor-pointer hover:scale-125 active:scale-100 transition-all duration-100 ease-linear z-10"
      >
        〉
      </button>
    </motion.div>
  );
};

export default Carocel;
