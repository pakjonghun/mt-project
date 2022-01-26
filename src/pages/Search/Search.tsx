import React, { useState } from "react";
import { useSearch } from "./hooks/hooks";
import { useGetMovieSearchResult } from "./hooks/reactQueryHooks";
import useViewPortWidth from "../../hooks/useViewportWidth";
import "react-virtualized/styles.css";
import { Grid, WindowScroller, AutoSizer } from "react-virtualized";
import useInfinityScroll from "./hooks/infinityScrollWindow";
import Header from "./components/Header";
import useGetStoreData from "../movie/hooks/getStoreData";
import useCacheMaker from "../movie/hooks/cacheMaker";
import GridChildRender from "./components/GridChildRender";
import Loading from "../../components/Loading";
import InfinityScrollGrid from "./components/InfinityScrollGrid";

export type SearchTarget = "movie" | "tv" | "multi";

const cols = {
  ["639" as string]: 1,
  "640": 2,
  "768": 3,
  "1024": 4,
  "1280": 4,
  "1536": 4,
};

const Search = () => {
  const [searchTareget, setSearchTarget] = useState<SearchTarget>("multi");
  const term = useSearch();
  const data = useGetMovieSearchResult(term || "", 1, searchTareget);

  const contents = useGetStoreData(searchTareget);
  const itemCount = contents.length;
  const curWidth = useViewPortWidth();
  const colCount = cols[curWidth || 639];
  const cache = useCacheMaker({ colCount, contents, curWidth });

  useInfinityScroll(data);
  const onSelected = (value: SearchTarget) => setSearchTarget(value);
  const renderChild = GridChildRender({
    colCount,
    contents,
    cache,
  });

  if (data.isLoading) {
    return (
      <div className="flex justify-center items-center  w-full h-screen bg-black">
        <Loading />
      </div>
    );
  }

  return (
    <InfinityScrollGrid
      term={term}
      searchTareget={searchTareget}
      totalResult={data.data?.pages[0].total_results}
      cache={cache}
      colCount={colCount}
      itemCount={itemCount}
      renderChild={renderChild}
      onSelected={onSelected}
    />
  );
};

export default Search;
