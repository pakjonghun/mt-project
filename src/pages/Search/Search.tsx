import React from "react";
import Item from "./components/Item";

const Search = () => {
  return (
    <main className="px-3 text-white">
      <div className="overflow-y-auto">
        <h1>Result</h1>
        <select>
          <option value="tv">TV</option>
          <option value="movie">Movie</option>
          <option value="all">All</option>
        </select>
        <div>
          <div className="grid grid-cols-4 gap-5">
            {[1, 2, 3, 4, 2, 1, 2, 3, 4, 5, 65, 1, 2, 3, 4, 5].map(() => (
              <Item />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Search;
