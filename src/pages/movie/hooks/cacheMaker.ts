import { TV, Movie } from "./../../../apis/types";
import { useEffect } from "react";
import { useMemo } from "react";
import { CellMeasurerCache } from "react-virtualized";

type UseCacheMakerProps = {
  colCount: number;
  contents: (Movie | TV)[];
  curWidth?: number;
};

const useCacheMaker = ({
  colCount,
  contents,
  curWidth,
}: UseCacheMakerProps) => {
  const cache = useMemo(
    () =>
      new CellMeasurerCache({
        fixedWidth: true,
        minHeight: 250,
        defaultHeight: 250,
        keyMapper: (row, col) => {
          const index = colCount * row + col;
          const curData = contents[index];
          return curData;
        },
      }),
    [contents, colCount]
  );

  useEffect(() => {
    cache.clearAll();
  }, [curWidth, cache]);

  return cache;
};

export default useCacheMaker;
