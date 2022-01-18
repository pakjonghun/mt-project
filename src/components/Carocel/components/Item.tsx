import React from "react";
import { getImageUrl, textCutter } from "../../../utilities/utility";
import basic from "../../../images/empty.jpg";
import { motion } from "framer-motion";

type Data = {
  title?: string;
  backdrop_path?: string;
  id?: number;
};

interface ItemProps {
  data: Data;
}

const Item: React.FC<ItemProps> = ({
  data: { title = "", backdrop_path = "", id },
}) => {
  return (
    <motion.div layoutId={String(id).trim()}>
      <img
        alt={title}
        src={getImageUrl(backdrop_path)}
        onError={(event) => (event.currentTarget.src = basic)}
        className="w-full h-full"
      />
      <small className="absolute bottom-0 scale-y-0 group-hover:scale-y-100 group-hover:translate-y-7 origin-top w-full mt-1 text-white font-bold text-center">
        {textCutter(title, 15)}
      </small>
    </motion.div>
  );
};

export default Item;
