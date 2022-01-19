import React from "react";
import { MotionValue, useTransform } from "framer-motion";
import { useViewportScroll } from "framer-motion";

type UseHideByScrollProps = (
  minScrollY: number,
  maxScrollY: number
) => MotionValue<number>;

const useHideByScroll: UseHideByScrollProps = (minScrollY, maxScrollY) => {
  const { scrollY } = useViewportScroll();
  return useTransform(scrollY, [minScrollY, maxScrollY], [1, 0]);
};

export default useHideByScroll;
