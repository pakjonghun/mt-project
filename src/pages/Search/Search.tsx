import React, { useRef, useState } from "react";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal/Modal";
import { getCommaNumber } from "../../utilities/utility";
import { useSearch } from "./hooks/hooks";
import { useGetMovieSearchResult } from "./hooks/reactQueryHooks";
import TargetItem from "./components/TargetItem";
import useInfinityScroll from "./hooks/infinityScroll";

export type SearchTarget = "movie" | "tv" | "multi";

const Search = () => {
  const [searchTareget, setSearchTarget] = useState<SearchTarget>("multi");
  const ref = useRef<HTMLDivElement>(null);
  const term = useSearch();
  const data = useGetMovieSearchResult(term || "", 1, searchTareget);
  useInfinityScroll(data);

  const onSelected = (value: SearchTarget) => setSearchTarget(value);

  if (data.isLoading) {
    return (
      <div className="flex justify-center items-center  w-full h-screen bg-black">
        <Loading />
      </div>
    );
  }

  return (
    <main className="px-3 text-stone-300">
      <div ref={ref} className="mx-auto w-fit overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h1 className="h4 font-bold">{`${term} : Total Search Results ${getCommaNumber(
            data?.data?.pages[0].total_results &&
              +data?.data?.pages[0].total_results
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
        <div>
          <div
            className={`grid items-start grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 w-full`}
          >
            {data.data?.pages && (
              <TargetItem
                data={data.data?.pages}
                searchTareget={searchTareget}
              />
            )}
          </div>
        </div>
      </div>
      <Modal />
    </main>
  );
};

export default Search;
