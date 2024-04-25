"use client";

import { ReactNode, useMemo } from "react";
import TablePagination from "./components/TanTablePagination/TablePagination";
import type {TablePaginationProps} from './components/TanTablePagination/TablePagination'
import React from "react";
import TableComponent from "./components/TableComponent";
import { TableProps } from "./interface";





export const Table = ({ children, columns, data, pagination ,fixedHeader = false,enableColumnResizing = false,rowSelection,rowKey = "index"}: TableProps) => {
  return (
    <>
      <TableComponent children={children} columns={columns} data={data} fixedHeader = {fixedHeader} rowSelection ={rowSelection} rowKey= {rowKey} enableColumnResizing = {enableColumnResizing}/>
      {pagination &&<TablePagination  {...pagination}/>}
    </>
  );
};
