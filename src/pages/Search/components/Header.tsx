import React from "react";
import { getCommaNumber } from "../../../utilities/utility";
import { SearchTarget } from "../Search";

interface HeaderProps {
  term: string | null;
  searchTareget: SearchTarget;
  totalResult?: number;
  onSelected: (value: SearchTarget) => void;
}

const Header: React.FC<HeaderProps> = ({
  term,
  searchTareget,
  totalResult,
  onSelected,
}) => {
  return (
    <div className="fixed top-16 flex items-center justify-between w-full max-w-screen-2xl px-10 my-7 z-10 bg-black">
      <h1 className=" h4 font-bold text-stone-200">{`${term} : Total Search Results ${getCommaNumber(
        totalResult
      )}`}</h1>

      <select
        className="ml-3 h-fit px-3 py-1 rounded-sm"
        defaultValue={searchTareget}
        onChange={(event) => onSelected(event.target.value as SearchTarget)}
      >
        <option value="tv">TV</option>
        <option value="movie">Movie</option>
        <option value="multi">All</option>
      </select>
    </div>
  );
};

export default Header;
