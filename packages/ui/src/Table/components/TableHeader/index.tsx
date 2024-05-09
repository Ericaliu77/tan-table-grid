import { Table, flexRender } from "@tanstack/react-table";
import { TableHeaderContainer } from "../../style";
import { ColumnDataType } from "../../interface";

interface tableHeaderProps {
  table: Table<any>;
  columns?: ColumnDataType[];
  fixedHeader: boolean;
}
export const TableHeader = ({ table, fixedHeader }: tableHeaderProps) => {
  return (
    <>
      {table?.getHeaderGroups().map((headerGroup: any) => (
        <TableHeaderContainer
          key={headerGroup.id}
          style={{
            zIndex: 100,
            position: fixedHeader ? "sticky" : "relative",
            top: 0,
          }}
        >
          {headerGroup.headers.map((header: any) => {
            return (
              <div
                key={header.id}
                style={{
                  backgroundColor: "inherit",
                  display:'contents',
                  position:'relative',
                  // width: header.getSize(),
                }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              
              </div>
            );
          })}
        </TableHeaderContainer>
      ))}
    </>
  );
};
