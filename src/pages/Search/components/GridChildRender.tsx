import React, { CSSProperties, useCallback } from "react";
import { CellMeasurer, CellMeasurerCache } from "react-virtualized";
import { MeasuredCellParent } from "react-virtualized/dist/es/CellMeasurer";
import { GridCoreProps } from "react-virtualized/dist/es/Grid";
import { Movie, TV } from "../../../apis/types";
import Item from "./Item";

export type CellRenderProps = {
  columnIndex: number;
  key: string;
  rowIndex: number;
  style: CSSProperties;
  parent: React.Component<GridCoreProps> & MeasuredCellParent;
};

type GridChildRenderProps = {
  colCount: number;
  contents: (Movie | TV)[];
  cache: CellMeasurerCache;
};

const GridChildRender = ({
  colCount,
  contents,
  cache,
}: GridChildRenderProps) => {
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

  return renderChild;
};

export default GridChildRender;
