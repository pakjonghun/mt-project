import React, { useState } from "react";
import { textCutter } from "../../utilities/utility";
import Item from "./components/Item";
import { motion } from "framer-motion";

type item = {
  title: string;
  backdrop_path: string;
  id: number;
};

interface CarocelProps {
  itemCount?: number;
  data: item[];
}

const Carocel: React.FC<CarocelProps> = ({ itemCount = 4, data }) => {
  const [index, setIndex] = useState(0);

  const singleSliceItems = (index: number) =>
    data.slice(2 + index * 6, itemCount + 2 + index * 6);

  return (
    <div className="relative bg-red-500 h-24 sm:h-28 md:h-32 lg:h-36 xl:h-40 2xl:h-44 mb-5">
      <button className="absolute left-0 top-1/2 -translate-y-1/2 text-white">
        〈
      </button>
      <button className="absolute right-0 top-1/2 -translate-y-1/2">〉</button>
      <div
        style={{
          gridTemplateColumns: `repeat(${itemCount},1fr)`,
        }}
        className="absolute top-1/2 -translate-y-1/2 grid grid-cols-5 gap-1 px-7"
      >
        {singleSliceItems(index).map((item) => (
          <motion.div
            key={item.id}
            className="relative h-fit last:origin-right first:origin-left hover:-translate-y-5 hover:scale-110 duration-150 ease-linear transition-all"
          >
            <Item title={item.title} image={item.backdrop_path} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Carocel;
