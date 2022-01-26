import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Modal from "../../components/Modal/Modal";
import Loading from "../../components/Loading";
import { getCommaNumber } from "../../utilities/utility";
import { useSearch } from "./hooks/hooks";
import { useGetMovieSearchResult } from "./hooks/reactQueryHooks";
import { Helmet } from "react-helmet-async";
import useViewPortWidth from "../../hooks/useViewportWidth";
import "react-virtualized/styles.css";
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
import { useAppSelector } from "../../hooks/reduxHooks";
import useInfinityScroll from "./hooks/infinityScrollWindow";
import { Movie, TV } from "../../apis/types";

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

  useInfinityScroll(data);
  const movies = useAppSelector((state) => state.movie);
  const tvs = useAppSelector((state) => state.tv);
  const contents = useMemo(() => {
    switch (searchTareget) {
      case "movie":
        return movies;
      case "tv":
        return tvs;
      case "multi":
        return [...movies, ...tvs];
      default:
        throw new Error("searchTarget Error");
    }
  }, [movies, tvs, searchTareget]);
  const itemCount = contents.length;
  const curWidth = useViewPortWidth();
  const colCount = cols[curWidth || 639];

  const onSelected = (value: SearchTarget) => setSearchTarget(value);

  const cache = useMemo(
    () =>
      new CellMeasurerCache({
        fixedWidth: true,
        minHeight: 150,
        defaultHeight: 250,
        keyMapper: (row, col) => {
          const index = colCount * row + col;
          const curData = contents[index];
          return curData;
        },
      }),
    [contents, colCount]
  );

  useEffect(() => {
    cache.clearAll();
  }, [curWidth, cache]);

  function cellRenderer({
    columnIndex,
    key,
    rowIndex,
    style,
    parent,
  }: CellRenderProps) {
    const index = colCount * rowIndex + columnIndex;
    const curData = contents[index];

    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={columnIndex}
        rowIndex={rowIndex}
      >
        <div key={key} style={style}>
          {curData && <Item data={curData} />}
        </div>
      </CellMeasurer>
    );
  }

  const renderChild = useCallback(cellRenderer, [colCount, contents, cache]);

  if (data.isLoading) {
    return (
      <div className="flex justify-center items-center  w-full h-screen bg-black">
        <Loading />
      </div>
    );
  }

  return (
    <main className="px-3 text-stone-300 ">
      <Helmet>
        <title>Search</title>
      </Helmet>
      <div className="max-w-screen-2xl mx-auto">
        <WindowScroller>
          {({ height, scrollTop, isScrolling, onChildScroll }) => (
            <div className="mx-auto pt-10">
              <div className="fixed top-16 flex items-center justify-between w-full max-w-screen-2xl px-10 mb-5 z-10 bg-black">
                <h1 className=" h4 font-bold">{`${term} : Total Search Results ${getCommaNumber(
                  contents.length &&
                    data.data?.pages[0].total_results &&
                    +data.data?.pages[0].total_results
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

              <AutoSizer disableHeight>
                {({ width }) => (
                  <Grid
                    deferredMeasurementCache={cache}
                    onScroll={onChildScroll}
                    isScrolling={isScrolling}
                    scrollTop={scrollTop}
                    cellRenderer={renderChild}
                    autoHeight
                    height={height}
                    width={width}
                    columnCount={colCount}
                    columnWidth={width / colCount}
                    rowCount={Math.ceil(itemCount / colCount)}
                    rowHeight={cache.rowHeight}
                    overscanRowCount={0}
                  />
                )}
              </AutoSizer>
            </div>
          )}
        </WindowScroller>
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
