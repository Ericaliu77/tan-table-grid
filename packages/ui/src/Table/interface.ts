import { TablePaginationProps } from "./components/TanTablePagination/TablePagination";

export interface TableProps {
  children?: ReactNode;
  columns?: ColumnDataType[];
  data: any[];
  fixedHeader?:boolean;
  rowKey?:string;
  pagination?: TablePaginationProps;
  enableColumnResizing?: boolean;
  rowSelection?: {
    selectedRowKeys?: string[] | number[];
    checkDisabled?:(record)=>boolean;
    onChange: (selectedRowKeys?: any, info?: any) => void;
  };
}
export interface ColumnType<RecordType> {
  title?: string;
  key: string;
}
export interface TableCellType {
  // align?: string;
  // title?: string;
  // key: string;
}

export type ColumnsType<RecordType = unknown> =
  readonly ColumnType<RecordType>[];

export type TableCellsType = readonly TableCellType[];

export interface ColumnSizeType {
  size?: number;
  minSize?: number;
  maxSize?: number ;
}
export interface ColumnDataType {
  title: string;
  dataIndex: string;
  key?: string;
  align?: any;//"center" | "left" | "right";
  width?: number | undefined;
  render?:any;
  fixed?:"left"|'right'
  // hidden?: boolean
  enableResizing?: boolean
}

export type RowSelectMethod = 'all' | 'none' | 'invert' | 'single' | 'multiple';
