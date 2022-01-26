import React from "react";

import "react-virtualized/styles.css";
import {
  Grid,
  WindowScroller,
  AutoSizer,
  CellMeasurerCache,
} from "react-virtualized";
import Header from "./Header";
import { CellRenderProps } from "./GridChildRender";
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
  );
};

export default InfinityScrollGrid;
