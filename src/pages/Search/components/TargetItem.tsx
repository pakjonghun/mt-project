import React from "react";
import { MTType, TMDBData } from "../../../apis/types";
import { SearchTarget } from "../Search";
import Item from "./Item";

interface TargetItemProps {
  data: TMDBData<MTType[]>[];
  searchTareget: SearchTarget;
}

const TargetItem: React.FC<TargetItemProps> = ({ data, searchTareget }) => {
  return (
    <>
      {data.map((item) =>
        item.results.map((jtem) => {
          switch (searchTareget) {
            case "movie":
              if (jtem.media_type !== "movie")
                return <React.Fragment key={jtem.id} />;
              return <Item key={jtem.id} data={jtem} />;

            case "tv":
              if (jtem.media_type !== "tv")
                return <React.Fragment key={jtem.id} />;
              return <Item key={jtem.id} data={jtem} />;

            case "multi":
              if (jtem.media_type !== "movie" && jtem.media_type !== "tv") {
                return <React.Fragment key={jtem.id} />;
              }
              return <Item key={jtem.id} data={jtem} />;

            default:
              throw new Error("No search target");
          }
        })
      )}
    </>
  );
};

export default TargetItem;
