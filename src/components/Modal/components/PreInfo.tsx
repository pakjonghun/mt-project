import React from "react";
import { getImageUrl } from "../../../utilities/utility";
import basicImg from "../../../images/empty.jpg";

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
      <div className="relative after:absolute after:inset-0 after:-skew-y-12 after:bg-black/20 rounded-md overflow-hidden">
        <img
          src={getImageUrl(image)}
          onError={(event) => (event.currentTarget.src = basicImg)}
          alt={title}
          className=""
        />
      </div>
      <h4>{title}</h4>
    </div>
  );
};

export default PreInfo;
