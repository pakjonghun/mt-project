import React, { useEffect, useRef } from "react";
import { getImageUrl, textCutter } from "../../../utilities/utility";
import basic from "../../../images/empty.jpg";

type Data = {
  title?: string;
  backdrop_path?: string;
};

interface ItemProps {
  data: Data;
  img: React.RefObject<HTMLImageElement>;
}

const Item: React.FC<ItemProps> = ({
  data: { title = "", backdrop_path = "" },
  img,
}) => {
  return (
    <>
      <img
        ref={img}
        className="w-full h-full"
        src={getImageUrl(backdrop_path)}
        onError={(event) => (event.currentTarget.src = basic)}
        alt={title}
      />
      <small className="absolute bottom-0 scale-y-0 group-hover:scale-y-100 group-hover:translate-y-7 origin-top w-full mt-1 text-white font-bold text-center">
        {textCutter(title, 15)}
      </small>
    </>
  );
};

export default Item;
