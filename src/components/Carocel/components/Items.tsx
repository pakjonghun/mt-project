import React from "react";
import Item from "./Item";
import { motion } from "framer-motion";
import { ItemProp } from "../Carocel";
import { useNavigate } from "react-router-dom";

interface ItemsProps {
  singleSliderData: ItemProp[];
  path: string;
}
const Items: React.FC<ItemsProps> = ({ singleSliderData, path }) => {
  const navigate = useNavigate();
  const onClick = (id: number) => navigate(`/${path}/${id}`);

  return (
    <>
      {singleSliderData.map((item) => (
        <motion.div
          key={item.id}
          onClick={() => onClick(item.id)}
          className="relative first:origin-left last:origin-right hover:scale-110 active:scale-100 transition-all duration-150 ease-linear hover:-translate-y-4 group cursor-pointer"
        >
          <Item data={item} />
        </motion.div>
      ))}
    </>
  );
};

export default Items;
