import React, { useEffect, useState } from "react";
import bacis from "../../../images/empty.jpg";
import { getVideoUrl } from "../../../utilities/utility";

interface VideoCoverProps {
  video: { name?: string; key?: string };
}

const VideoCover: React.FC<VideoCoverProps> = ({ video }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 400);
  }, []);

  return (
    <>
      {video?.key && (
        <div
          style={{ paddingBottom: "70%" }}
          className="relative h-0 w-full group"
        >
          <img
            src={bacis}
            alt="iframe embed"
            className={`w-full ${!isLoading && "hidden"} z-10`}
          />
          <iframe
            loading="eager"
            title={video.key}
            className={`absolute top-0 left-0 h-full w-full ${
              isLoading ? "opacity-0" : "opacity-100"
            } transition-all duration-500 ease-in`}
            src={getVideoUrl(video.key)}
          />
        </div>
      )}
    </>
  );
};

export default VideoCover;
