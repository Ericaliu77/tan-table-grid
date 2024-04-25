export interface TableCellProps {
  align?: "left" | "center" | "right";
  key: string;
  children?: string| number;
  sx?: any;
}
export const TableCell = ({ align, key, children, sx }: TableCellProps) => {
  return <div>{children}</div>;
};
