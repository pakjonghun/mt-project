import React from "react";
import { getImageUrl, textCutter } from "../../../utilities/utility";

interface ItemProps {
  image?: string;
  title?: string;
}

const Item: React.FC<ItemProps> = ({ image = "", title = "" }) => {
  return (
    <>
      <img
        className="h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 2xl:h-40"
        src={getImageUrl(image)}
        alt={title}
      />
      <small
        style={{ bottom: "-20%" }}
        className="absolute -bottom-5 w-full block text-center bg-yellow-300"
      >
        {textCutter(title, 15)}
      </small>
    </>
  );
};

export default Item;
