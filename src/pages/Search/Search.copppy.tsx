import React, {
  CSSProperties,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import Modal from "../../components/Modal/Modal";
import Loading from "../../components/Loading";
import { getCommaNumber } from "../../utilities/utility";
import { useSearch } from "./hooks/hooks";
import { useGetMovieSearchResult } from "./hooks/reactQueryHooks";
import { Helmet } from "react-helmet-async";
import { VariableSizeList as List } from "react-window";
import useViewPortWidth from "../../hooks/useViewportWidth";
import "react-virtualized/styles.css";
import useInfinityScroll from "./hooks/infinityScroll";
import { InfiniteData, useQueryClient } from "react-query";
import { Paths } from "../../router/types";
import { MTType, TMDBData } from "../../apis/types";
import {
  Grid,
  WindowScroller,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import Item from "./components/Item";
import { GridCoreProps } from "react-virtualized/dist/es/Grid";
import { MeasuredCellParent } from "react-virtualized/dist/es/CellMeasurer";

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
  const ref = useRef<HTMLDivElement>(null);
  const term = useSearch();
  const data = useGetMovieSearchResult(term || "", 1, searchTareget);

  const itemCount =
    !data.isFetching && data?.data?.pages
      ? +data.data.pages[data.data.pages.length - 1].results.length +
        +(data.data.pages.length - 1) * 20
      : 0;
  const curWidth = useViewPortWidth();
  const colCount = cols[curWidth || 639];

  useInfinityScroll(data);

  const onSelected = (value: SearchTarget) => setSearchTarget(value);

  const cache = useMemo(
    () =>
      new CellMeasurerCache({
        fixedWidth: true,
        minHeight: 250,
        defaultHeight: 500,
      }),
    []
  );

  function cellRenderer({
    columnIndex,
    key,
    rowIndex,
    style,
    parent,
  }: CellRenderProps) {
    const index = colCount * rowIndex + columnIndex;
    const page = Math.floor(index / 20);
    const result = index - page * 20;
    const temp = data.data?.pages[page];
    const curData = temp && data.data?.pages[page].results[result];
    const curType = curData?.media_type;
    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={columnIndex}
        rowIndex={rowIndex}
      >
        <div className="text-black" key={key} style={style}>
          {curData && <Item data={curData} />}
        </div>
      </CellMeasurer>
    );
  }

  const renderChild = useCallback(cellRenderer, [
    // data.isFetching,
    colCount,
    data.data?.pages,
    cache,
  ]);

  if (data.isLoading) {
    return (
      <div className="flex justify-center items-center  w-full h-screen bg-black">
        <Loading />
      </div>
    );
  }

  return (
    <main className="px-3 text-stone-300 bg-blue-300">
      <Helmet>
        <title>Search</title>
      </Helmet>
      <div className=" max-w-screen-2xl mx-auto">
        <div ref={ref} className="mx-auto">
          <div className="flex items-center justify-between mb-5">
            <h1 className="h4 font-bold">{`${term} : Total Search Results ${getCommaNumber(
              data?.data?.pages[0].total_results &&
                +data?.data?.pages[0].total_results
            )}`}</h1>
            <select
              className="ml-3 h-fit px-3 py-1 rounded-sm"
              defaultValue={searchTareget}
              onChange={(event) =>
                onSelected(event.target.value as SearchTarget)
              }
            >
              <option value="tv">TV</option>
              <option value="movie">Movie</option>
              <option value="multi">All</option>
            </select>
          </div>
          {/* <WindowScroller>
          {({ height, width, scrollTop, isScrolling, onChildScroll }) => ( */}
          <AutoSizer disableHeight>
            {({ width }) => (
              <Grid
                deferredMeasurementCache={cache}
                // onScroll={onChildScroll}
                // isScrolling={isScrolling}
                // scrollTop={scrollTop}
                height={Math.ceil(itemCount / colCount) * 200}
                autoHeight
                width={width}
                cellRenderer={renderChild}
                columnCount={colCount}
                columnWidth={width / colCount}
                rowCount={Math.ceil(itemCount / colCount)}
                rowHeight={cache.rowHeight}
                overscanRowCount={0}
              />
            )}
          </AutoSizer>
        </div>
        {/* )}
        </WindowScroller> */}
      </div>
      <Modal />
    </main>
  );
};

export default Search;

type CellRenderProps = {
  columnIndex: number;
  key: string;
  rowIndex: number;
  style: CSSProperties;
  parent: React.Component<GridCoreProps> & MeasuredCellParent;
};
