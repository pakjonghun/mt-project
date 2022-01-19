import React from "react";
import { useLocation } from "react-router-dom";

export const useGetMiddlePath = () => {
  const { pathname } = useLocation();
  const path = pathname.match(/^\/([a-z]+)/);

  return path && path[1];
};
