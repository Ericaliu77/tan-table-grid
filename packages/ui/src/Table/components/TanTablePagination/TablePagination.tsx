import { MenuItem, Pagination, Select } from "@mui/material";

export interface TablePaginationProps {
  total: number;
  pageSize: number;
  current?: number | 0;
  onChange?: (page: any) => void;
  pageSizeOptions?: number[];
  onShowSizeChange?: (size: any) => void;
}
const defaultRowsPerPageOptions = [10, 20, 50, 100];
export default (pagination: TablePaginationProps) => {
  const { total, current } = pagination;
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          justifyContent: "right",
          color: "#8C90A3",
          fontFamily: "PingFang SC",
        }}
      >
        <span style={{ margin: "0 5px" }}>
          共{total}项数据 第{current}/{total}页
        </span>
        <Select
          sx={{ height: "32px",background: '#F6F7F9',border:'0px', color: "#8C90A3", }}
          autoWidth
          inputProps={{ "aria-label": "Without label" }}
          value={
            pagination.pageSize ||
            (pagination.pageSizeOptions || defaultRowsPerPageOptions)[0]
          }
          onChange={(event) => {
            pagination.onShowSizeChange?.(event.target.value);
          }}
        >
          {(pagination.pageSizeOptions || defaultRowsPerPageOptions).map(
            (pageSize: number) => (
              <MenuItem value={pageSize} key={pageSize} style={{color: "#8C90A3",}}>
                {pageSize}条/页
              </MenuItem>
            )
          )}
        </Select>
        <Pagination
          page={pagination?.current || 0}
          count={Math.ceil(pagination?.total / pagination?.pageSize)}
          onChange={(event: React.ChangeEvent<unknown>, page: number) => {
            pagination?.onChange?.(page);
          }}
          shape="rounded"
        />
      </div>
    </>
  );
};
