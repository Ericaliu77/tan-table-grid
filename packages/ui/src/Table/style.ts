import styled from "@emotion/styled";

export let TableBodyContainer = styled.div({
  fontSize: 12,
});
export const TableHeaderContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  background: "#F6F7F9",
  color: "#8C90A3",
});

export const TableContentContainer = styled.div({
  width: "100%",
  display: "grid",
});

export const TableCellContainer = styled.div({
  padding: "10px",
  wordBreak: "break-all",
  minWidth: "50px",
  display: "flex",
  alignItems: "center",
  backgroundColor: "inherit",
});
