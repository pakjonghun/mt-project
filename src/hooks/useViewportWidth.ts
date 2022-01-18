import React from "react";
import { useEffect, useState } from "react";

export enum Width {
  "sm" = 640,
  "md" = 768,
  "lg" = 1024,
  "xl" = 1280,
  "2xl" = 1536,
}

const useViewPortWidth = () => {
  const getWidth = () => {
    const w = window.innerWidth;
    switch (true) {
      case w < Width.sm:
        return Width.sm;
      case w < Width.md:
        return Width.sm;
      case w < Width.lg:
        return Width.md;
      case w < Width.xl:
        return Width.lg;
      case w < Width["2xl"]:
        return Width.xl;
      case w > Width["2xl"]:
        return Width["2xl"];
      default:
        break;
    }
  };

  const [width, setWidth] = useState(getWidth());

  useEffect(() => {
    let timer: null | NodeJS.Timeout;
    const dbounce = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => setWidth(getWidth()), 200);
    };

    window.addEventListener("resize", dbounce);
    return () => window.addEventListener("resize", dbounce);
  }, []);

  return width;
};

export default useViewPortWidth;
