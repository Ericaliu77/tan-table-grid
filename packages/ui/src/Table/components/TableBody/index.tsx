import { Table, flexRender } from "@tanstack/react-table";
import styled from "@emotion/styled";
import { Fragment } from "react";
import { Checkbox } from "antd";

interface TableBodyProps {
  table: Table<any>;
  data: any[];
  rowSelection: any;
}
const TableRowCont = styled.div({
  display: "contents",
  alignItems: "center",
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: "#F6F7FA",
  },
});
export const TableBody = ({ table, rowSelection }: TableBodyProps) => {
  return (
    <>
      {table?.getRowModel().rows.map((row, index) => {
        return (
          <TableRowCont className="tanTable-row" key={row.id} style={{}}>
            
            {row.getVisibleCells().map((cell, index) => {
              return (
                <Fragment key={index}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Fragment>
              );
            })}
          </TableRowCont>
        );
      })}
    </>
  );
};
