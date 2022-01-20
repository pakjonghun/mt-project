import React from "react";
import { getImageUrl } from "../../../utilities/utility";
import basicImg from "../../../images/empty.jpg";
import Stars from "../../Stars";

interface PreInfoProps {
  image?: string;
  title?: string;
  vote?: number;
}

const PreInfo: React.FC<PreInfoProps> = ({
  image = "",
  title = "",
  vote = 0,
}) => {
  return (
    <div className="">
      <div className="relative after:absolute after:inset-0 after:-skew-y-12 after:bg-stone-400/20 rounded-md overflow-hidden">
        <img
          src={getImageUrl(image)}
          onError={(event) => (event.currentTarget.src = basicImg)}
          alt={title}
          className="w-full"
        />
      </div>
      <h4 className="h4 mx-3 mt-3 mb-4 font-bold">{title}</h4>
      {!!vote && (
        <p className="flex mx-3">
          <span className="mr-3">{vote}</span>
          <Stars vote={vote} />
        </p>
      )}
    </div>
  );
};

export default PreInfo;
