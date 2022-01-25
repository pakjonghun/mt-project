import React, { CSSProperties, useCallback, useRef, useState } from "react";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal/Modal";
import { getCommaNumber } from "../../utilities/utility";
import { useSearch } from "./hooks/hooks";
import { useGetMovieSearchResult } from "./hooks/reactQueryHooks";
import TargetItem from "./components/TargetItem";
import useInfinityScroll from "./hooks/infinityScroll";
import { Helmet } from "react-helmet-async";
import {
  Grid,
  AutoSizer,
  InfiniteLoader,
  ScrollSync,
  WindowScroller,
} from "react-virtualized";
import useViewPortWidth from "../../hooks/useViewportWidth";
import "react-virtualized/styles.css";
import { useAppSelector } from "../../hooks/reduxHooks";
import { InfiniteData, useQuery } from "react-query";
import { MTType, TMDBData } from "../../apis/types";

export type SearchTarget = "movie" | "tv" | "multi";

type onSectionRenderedProps = {
  columnStartIndex: number;
  columnStopIndex: number;
  rowStartIndex: number;
  rowStopIndex: number;
};

const cols = {
  ["639" as string]: 2,
  "640": 3,
  "768": 3,
  "1024": 4,
  "1280": 4,
  "1536": 4,
};

const Search = () => {
  const [searchTareget, setSearchTarget] = useState<SearchTarget>("multi");
  const ref = useRef<HTMLDivElement>(null);
  const term = useSearch();
  const data = useGetMovieSearchResult(term || "", 1, searchTareget);
  const itemCount = data.data?.pages.length ? data.data?.pages.length * 20 : 0;
  const curWidth = useViewPortWidth();
  const colCount = cols[curWidth || 639];

  const onSelected = (value: SearchTarget) => setSearchTarget(value);
  useInfinityScroll(data);

  const Arr = [...Array(1000).fill(Math.random() * 5000)];

  const [list, setList] = useState(Arr);

  function Cell({ key, columnIndex, rowIndex, style }: CellProps) {
    console.log(columnIndex, rowIndex);
    return (
      <div
        key={key}
        style={style}
        className=" overflow-hidden mx-auto flex justify-center items-center bg-blue-200 text-black"
      >
        {/* {data.data?.pages && (
          <TargetItem data={data.data?.pages} searchTareget={searchTareget} />
        )} */}
        {data.data?.pages[columnIndex]?.results[rowIndex]?.id}
      </div>
    );
  }

  const cell = useCallback(Cell, [data.data?.pages]);

  if (data.isLoading) {
    return (
      <div className="flex justify-center items-center  w-full h-screen bg-black">
        <Loading />
      </div>
    );
  }

  return (
    <main className="px-3 text-stone-300">
      <Helmet>
        <title>Search</title>
      </Helmet>
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
            className={`grid items-start grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full`}
          >
            {data.data?.pages && (
              <TargetItem
                data={data.data?.pages}
                searchTareget={searchTareget}
              />
            )}
          </div>
          {/* <div
            style={{ height: "200vh", width: window.innerWidth - 50 }}
            className="bg-red-200"
          >
            <InfiniteLoader
              minimumBatchSize={1}
              isRowLoaded={() => data.isLoading}
              loadMoreRows={() => data.fetchNextPage()}
              rowCount={itemCount / colCount}
            >
              {({ onRowsRendered, registerChild }) => {
                function onSectionRendered({
                  columnStartIndex,
                  columnStopIndex,
                  rowStartIndex,
                  rowStopIndex,
                }: onSectionRenderedProps) {
                  const startIndex =
                    rowStartIndex * colCount + columnStartIndex;
                  const stopIndex = rowStopIndex * colCount + columnStopIndex;

                  onRowsRendered({
                    startIndex,
                    stopIndex,
                  });
                }

                return (
                  <InfinityChildFunc
                    Cell={cell}
                    registerChild={registerChild}
                    onSectionRendered={onSectionRendered}
                    colCount={colCount}
                    itemCount={itemCount}
                  />
                );
              }}
            </InfiniteLoader>
          </div> */}
        </div>
      </div>
      <Modal />
    </main>
  );
};

export default Search;

interface CellProps {
  columnIndex: number;
  rowIndex: number;
  style: CSSProperties;
  key: string;
}

interface InfinityChilfFuncProps {
  colCount: number;
  itemCount: number;
  Cell: ({ key, columnIndex, rowIndex, style }: CellProps) => JSX.Element;

  onSectionRendered: ({
    columnStartIndex,
    columnStopIndex,
    rowStartIndex,
    rowStopIndex,
  }: onSectionRenderedProps) => void;
  registerChild: (registerChild: any) => void;
}
const InfinityChildFunc: React.FC<InfinityChilfFuncProps> = ({
  colCount,
  itemCount,
  onSectionRendered,
  registerChild,
  Cell,
}) => {
  return (
    <WindowScroller>
      {({ height, scrollTop }) => (
        <AutoSizer>
          {({ width }) => (
            <Grid
              scrollTop={scrollTop}
              autoHeight
              height={height}
              ref={registerChild}
              onSectionRendered={onSectionRendered}
              cellRenderer={Cell}
              columnCount={colCount}
              columnWidth={width / colCount}
              rowCount={Math.ceil(itemCount / colCount)}
              rowHeight={200}
              width={width}
            />
          )}
        </AutoSizer>
      )}
    </WindowScroller>
  );
};
