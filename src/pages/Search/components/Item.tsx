import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MTType } from "../../../apis/types";
import Stars from "../../../components/Stars";
import basic from "../../../images/empty.jpg";
import { getImageUrl, textCutter } from "../../../utilities/utility";

interface ItemProps {
  data: MTType;
}

const Item: React.FC<ItemProps> = ({ data }) => {
  const { search } = useLocation();
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`${data.media_type}/${data.id}${search}`)}
      className="flex flex-col  justify-center p-1 cursor-pointer text-white"
    >
      <div className="overflow-hidden ">
        <img
          className="w-full h-full max-w-sm max-h-44 mx-auto hover:scale-110 active:scale-100 transition-all duration-150 ease-linear"
          src={getImageUrl(data.backdrop_path)}
          onError={(event) => (event.currentTarget.src = basic)}
          alt="basic"
        />
      </div>
      <div className="pl-2 mx-auto">
        <h4 className="w-full whitespace-nowrap">
          {textCutter(data.title || data.name || "", 24)}
        </h4>
        <p className="flex">
          <span className="mr-3">{data.vote_average || ""}</span>
          <Stars vote={data.vote_average} />
        </p>
      </div>
    </div>
  );
};

export default Item;
