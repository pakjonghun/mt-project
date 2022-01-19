import React from "react";
import VideoCover from "./VideoCover";

interface MainInfoProps {
  data: {
    homepage: string;
    overview: string;
    released: string;
    genres: { id?: number; name?: string }[];
    video: { name?: string; key?: string };
  };
}

const MainInfo: React.FC<MainInfoProps> = ({ data }) => {
  const { genres, homepage, overview, released, video } = data;
  return (
    <div className="px-3">
      <ul className="flex mt-3">
        {genres.map((item) => (
          <li
            key={item.id}
            className="after:mx-3 after:content-['|'] last:after:content-['']"
          >
            {item.name}
          </li>
        ))}
      </ul>
      <p className="mt-3 mb-3">
        {!!homepage && (
          <a
            href={homepage}
            rel="noopener noreferrer"
            target="_blank"
            className="hover:text-blue-700 uppercase active:opacity-70 mr-3"
          >
            Homepage
          </a>
        )}
        <span>{released}</span>
      </p>
      {video && <VideoCover video={video} />}
      <p className="mt-3">{overview}</p>
    </div>
  );
};

export default MainInfo;
