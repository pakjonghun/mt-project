import React, { useState } from "react";

const useSliderHandler = () => {
  const [index, setIndex] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isSliding, setIsSliding] = useState(false);
  const switchHandler = (direction: number) => {
    if (!isSliding) {
      switch (direction) {
        case 1:
        case -1:
          setIndex(index + direction);
          setIsSliding(true);
          setDirection(direction);
          break;
        default:
          throw new Error("Carocel switch error");
      }
    }
  };

  return { index, direction, isSliding, setIsSliding, switchHandler };
};

export default useSliderHandler;
