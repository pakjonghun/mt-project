import React from "react";
import { getImageUrl, textCutter } from "../../../utilities/utility";
import baseImage from "../../../images/empty.jpg";
import { motion, useViewportScroll, useTransform } from "framer-motion";

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
  const { scrollY } = useViewportScroll();
  const infoOptcity = useTransform(scrollY, [190, 250], [1, 0]);
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.0),rgba(0,0,0,0.7)), url(${getImageUrl(
          image
        )}) ,url(${baseImage})`,
      }}
      className="flex flex-col justify-center h-60vh lg:h-80vh xl:h-90vh 2xl:h-100vh p-5 bg-basic bg-cover text-stone-100"
    >
      <motion.div style={{ opacity: infoOptcity }} className="h-fit w-1/2">
        <h1 className="mb-4 text-2xl font-bold">{title}</h1>
        <p>{textCutter(overview, 400)}</p>
      </motion.div>
    </div>
  );
};

export default Banner;
