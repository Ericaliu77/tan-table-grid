"use client";

import { ReactNode, useCallback, useMemo, useRef } from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { TableHeader } from "../TableHeader";
import { TableBody } from "../TableBody";
import { TableCellContainer, TableContentContainer } from "../../style";
import styled from "@emotion/styled";
import { ColumnDataType, ColumnSizeType } from "../../interface";
import "./index.css";
import useColumns from "../../hooks/useColumns";
import useSelection from "../../hooks/useSelection";
import { getRowKey } from "../../utils";
import usePopup from "../../hooks/usePopup";
const defaultColumnSize: ColumnSizeType = {
  size: 150,
  minSize: 50,
  maxSize: Number.MAX_SAFE_INTEGER,
};

interface TableComponentProps {
  children?: ReactNode;
  columns?: ColumnDataType[];
  data: any[];
  fixedHeader: boolean;
  enableColumnResizing: boolean;
  columnSize?: ColumnSizeType;
  rowKey?: string;
  rowSelection?: {
    selectedRowKeys?: string[] | number[];
    checkDisabled?: (record) => boolean;
    onChange: (selectedRowKeys?: any, info?: any) => void;
  };
}
const TableContainer = styled.div({
  position: "relative",
  ".tan-table-header-cell": {},
});
const TableCellEllipsis = styled.div({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const TableComponent = ({
  columns,
  data,
  fixedHeader,
  enableColumnResizing,
  columnSize = defaultColumnSize,
  rowSelection,
  rowKey = "index",
}: TableComponentProps) => {
 
  const { handleResize, gridWidths, getColumnOffset } = useColumns({
    columns,
    // rowSelection,
    onRowSelection: !!rowSelection,
  });

  const {triggerTooltipVisible} = usePopup({});

  const table = useRef<any>();
  const { rowSelectionAccessor } = useSelection({
    rowSelection,
    rowKey,
    columns,
  });
  const columnHelper = createColumnHelper<any>();
  const cd = useMemo(() => {
    const values = columns?.map((cItem: ColumnDataType, cIndex: any) => {
      let sx: React.CSSProperties = {
        flex: cItem.width ? "none" : "auto",
        justifyContent: cItem.align || "left",
        position: "relative",
      };
      return columnHelper.accessor(cItem.dataIndex, {
        size: cItem.width || undefined,
        enableResizing:
          cItem.width == null
            ? false
            : cItem.enableResizing
              ? cItem.enableResizing
              : true,
        header: (info) => {
          return (
            <>
              <TableCellContainer
                className="tan-table-header-cell"
                key={cItem.dataIndex}
                style={{
                  ...sx,
                  width: info.header.getSize(),
                  ...(cItem.fixed === "left" && {
                    position: "sticky",
                    left:
                      getColumnOffset(cItem.dataIndex) +
                      (rowSelection ? 50 : 0),
                    zIndex: 99,
                  }),
                  ...(cItem.fixed === "right" && {
                    position: "sticky",
                    right: getColumnOffset(cItem.dataIndex),
                    zIndex: 99,
                  }),
                }}
              >
                <TableCellEllipsis>{cItem.title}</TableCellEllipsis>

                {enableColumnResizing &&
                  cItem.enableResizing != false &&
                  cItem.width &&
                  cIndex != columns.length - 1 && (
                    <div
                      style={{ zIndex: 199 }}
                      {...{
                        onDoubleClick: () => info.header.column.resetSize(),
                        onMouseDown: handleResize(info),
                        onTouchStart: handleResize(info),
                        className: `resizer ${
                          info.table.options.columnResizeDirection
                        } ${
                          info.header.column.getIsResizing() ? "isResizing" : ""
                        }`,
                      }}
                    />
                  )}
              </TableCellContainer>
            </>
          );
        },
        cell: (info) => {
          return (
            <TableCellContainer
              key={
                getRowKey(rowKey, {
                  index: info.cell.id,
                  ...info.row.original,
                }) || info.cell.id
              }
              style={{
                ...sx,
                ...(cItem.fixed === "left" && {
                  position: "sticky",
                  left:
                    getColumnOffset(cItem.dataIndex) + (rowSelection ? 50 : 0),
                  zIndex: 99,
                }),
                ...(cItem.fixed === "right" && {
                  position: "sticky",
                  right: getColumnOffset(cItem.dataIndex),
                  zIndex: 99,
                }),
              }}
            >
              {cItem.render ? (
                cItem.render(info.row.original, info.getValue(), info.row.index)
              ) : cItem.ellipsis ? (
                <TableCellEllipsis

                  onMouseEnter={(e)=>{
                    triggerTooltipVisible(true,e,info.getValue())
                  }}
                  onMouseLeave={(e)=>{
                    triggerTooltipVisible(false,e)
                  }}
                >
                  {info.getValue()}
                </TableCellEllipsis>
              ) : (
                <div>{info.getValue()}</div>
              )}
            </TableCellContainer>
          );
        },
        footer: (info) => info.column.id,
      });
    });
    if (rowSelection) {
      values?.unshift(rowSelectionAccessor);
    }
    return values;
  }, [columns, enableColumnResizing]);

  table.current = useReactTable({
    columns: [...(cd || [])],
    data: data,
    getCoreRowModel: getCoreRowModel(),
    columnResizeDirection: "ltr",
    enableColumnResizing,
    columnResizeMode: "onChange",
    defaultColumn: {
      ...defaultColumnSize,
      ...columnSize,
    },
  });
  return (
    <>
      <div
        id="table_tooltip"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "auto",
          height: "auto",
          padding:'10px',
          backgroundColor: "#000000",
          display: "none",
          borderRadius:'10px',
          zIndex: 9999,
          color:'white',
          transform: "translateX(-50%)",
        }}
      >
        
      </div>
      <div
        className="tan-table-container"
        id="tan-table-container"
        style={{
          overflow: "auto",
          width: "100%",
          borderRadius: "6px 6px 0px 0px",
          height: "100%",
        }}
      >
        <TableContainer
          style={{
            minWidth:
              gridWidths?.reduce(
                (total: any, width: any) =>
                  width ? total + width : total + 50,
                0
              ) || 0,
          }}
        >
          <TableHeader
            table={table.current}
            columns={columns}
            fixedHeader={fixedHeader}
          />
          <TableContentContainer
            style={{
              gridTemplateColumns: (rowSelection ? [...gridWidths] : gridWidths)
                .map((width: string | number | null) =>
                  width ? width + "px" : "auto"
                )
                .join(" "), // gridColumns,
            }}
          >
            <TableBody
              table={table.current}
              data={data}
              rowSelection={rowSelection}
            />
          </TableContentContainer>
        </TableContainer>
      </div>
    </>
  );
};

export default TableComponent;
