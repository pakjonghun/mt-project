import { useLocation } from "react-router-dom";

export const useSearch = () => {
  const { search } = useLocation();
  const term = new URLSearchParams(search).get("term");

  return term;
};
