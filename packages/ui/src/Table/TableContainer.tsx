import {
  createColumnHelper,
} from "@tanstack/react-table";
import { ReactNode, useMemo } from "react";
import { ColumnsType, TableCellsType } from "./interface";
import { convertChildrenToColumns, convertChildrenToDatas } from "./utils";

import TablePagination from "./components/TanTablePagination/TablePagination";
import type {TablePaginationProps} from './components/TanTablePagination/TablePagination'
import TableComponent from "./components/TableComponent";

interface TableContainerProps {
  children: ReactNode;
  fixedHeader?:boolean;
  pagination?: TablePaginationProps;
}

export const TableContainer = ({ children,pagination,fixedHeader = false }: TableContainerProps) => {
  const columnHelper = createColumnHelper<any>();
  const baseColumns = useMemo(
    () =>
      convertChildrenToColumns(
        (children || [])?.filter(
          (item: { type: { name: string } }) => item?.type?.name === "Column"
        )
      ) as ColumnsType<RecordType>,
    [children]
  );
  const baseData = useMemo(() => {
    const datas: any = [];
    const columns = [];

    (children || []).map((item: any) => {
      if (item?.type?.name === "Column") {
        columns.push(item);
      } else if (item instanceof Array) {
        datas.push(...item);
      } else {
        datas.push(item);
      }
    });
    const data = convertChildrenToDatas(datas) as TableCellsType;
    return [...data];
  }, [children]);

  return (
    <>
      <TableComponent
        children={children}
        columns={baseColumns||[]}
        data={baseData}
        fixedHeader = {fixedHeader}
      />
            {pagination &&<TablePagination  {...pagination}/>}

    </>
  );
};
