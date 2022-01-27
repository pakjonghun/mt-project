import React from "react";

import "react-virtualized/styles.css";
import {
  Grid,
  WindowScroller,
  AutoSizer,
  CellMeasurerCache,
} from "react-virtualized";
import Header from "./Header";
import GridChildRender, { CellRenderProps } from "./GridChildRender";
import { SearchTarget } from "../Search";

interface InfinityScrollGridProps {
  term: string | null;
  searchTareget: SearchTarget;
  totalResult?: number;
  cache: CellMeasurerCache;
  colCount: number;
  itemCount: number;
  onSelected: (value: SearchTarget) => void;
  renderChild: ({
    columnIndex,
    key,
    rowIndex,
    style,
    parent,
  }: CellRenderProps) => JSX.Element;
}

const InfinityScrollGrid: React.FC<InfinityScrollGridProps> = ({
  term,
  searchTareget,
  totalResult,
  cache,
  colCount,
  itemCount,
  renderChild,
  onSelected,
}) => {
  return (
    <WindowScroller>
      {({ height, scrollTop, isScrolling, onChildScroll }) => (
        <div className="mx-auto pt-10">
          <Header
            term={term}
            searchTareget={searchTareget}
            totalResult={totalResult}
            onSelected={onSelected}
          />
          <AutoSizer disableHeight>
            {({ width }) => (
              <Grid
                deferredMeasurementCache={cache}
                isScrolling={isScrolling}
                scrollTop={scrollTop}
                autoHeight
                height={height}
                width={width}
                columnCount={colCount}
                columnWidth={width / colCount}
                overscanRowCount={0}
                rowCount={Math.ceil(itemCount / colCount)}
                onScroll={onChildScroll}
                cellRenderer={renderChild}
                rowHeight={cache.rowHeight}
              />
            )}
          </AutoSizer>
        </div>
      )}
    </WindowScroller>
  );
};

export default InfinityScrollGrid;
