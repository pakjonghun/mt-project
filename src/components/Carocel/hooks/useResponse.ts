import React, { useEffect, useState } from "react";
import useViewPortWidth, { Width } from "../../../hooks/useViewportWidth";

const useResponse = (itemCount: number) => {
  const [count, setCount] = useState(itemCount);
  const [imgPadding, setImgPadding] = useState("15%");
  const width = useViewPortWidth();
  useEffect(() => {
    if (width) {
      switch (width) {
        case Width.sm:
          setCount(3);
          setImgPadding("15%");
          break;
        case Width.md:
          setCount(4);
          setImgPadding("12%");
          break;
        case Width.lg:
          setCount(5);
          setImgPadding("10%");
          break;
        case Width.xl:
          setCount(6);
          setImgPadding("8%");
          break;
        case Width["2xl"]:
          setCount(7);
          setImgPadding("7%");
          break;
        default:
          break;
      }
    }
  }, [width]);

  return { count, imgPadding };
};

export default useResponse;
