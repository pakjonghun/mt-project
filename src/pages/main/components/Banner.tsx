import React from "react";

interface BannerProps {
  title: string;
  description: string;
  image: string;
  basicImage: string;
}

const Banner: React.FC<BannerProps> = ({
  title,
  description,
  image,
  basicImage,
}) => {
  return (
    <div>
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Banner;
