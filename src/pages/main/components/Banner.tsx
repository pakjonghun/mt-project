import React from "react";
import { getImageUrl, textCutter } from "../../../utilities/utility";
import baseImage from "../../../images/empty.jpg";

interface BannerProps {
  title?: string;
  overview?: string;
  image?: string;
}

const Banner: React.FC<BannerProps> = ({
  image = "",
  title = "",
  overview = "",
}) => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.6)), url(${getImageUrl(
          image
        )}) ,url(${baseImage})`,
      }}
      className="flex flex-col justify-center h-60vh p-5 bg-cover text-white"
    >
      <div className="h-fit w-1/2">
        <h1 className="mb-4 text-2xl font-bold">{title}</h1>
        <p>{textCutter(overview, 500)}</p>
      </div>
    </div>
  );
};

export default Banner;
