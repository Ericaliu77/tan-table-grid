import styled from "@emotion/styled";
import { Checkbox } from "antd";
import {  useCallback, useEffect, useMemo, useState } from "react";
import { RowSelectMethod } from "../interface";
import { getRowKey } from "../utils";

const CheckboxContainer = styled.div({
  padding: "10px",
  wordBreak: "break-all",
  minWidth: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "inherit",
  zIndex: 101,
  position: "sticky",
  left: 0,
  width: "50px",
});
const useSelection = ({ rowSelection, columns, rowKey }: any) => {
  const { selectedRowKeys = [], onChange: onSelectionChange } = rowSelection;
  const [activeKeys, setActiveKeys] = useState<any>(selectedRowKeys);
  const keys: Set<any> = useMemo(() => {
    return new Set(activeKeys);
  }, []);

  const setSelectedKeys = useCallback(
    (keys: any[], method: RowSelectMethod) => {
      setActiveKeys([...keys]);
      onSelectionChange && onSelectionChange(keys, method);
    },

    [onSelectionChange]
  );
  const checkRowKeyProps = useCallback(() => {}, [rowSelection, rowKey]);

  useEffect(() => {
    checkRowKeyProps();
  }, []);
  const onSelectAll = (checked: boolean) => {
    if (checked) {
      columns.map((record: any, index: any) =>
        keys.add(
          getRowKey(rowKey, {
            index,
            ...record,
          }),
        )
      );
      setSelectedKeys([...Array.from(keys)], "all");
    } else {
      keys.clear();
      setSelectedKeys([], "all");
    }
  };

  const rowSelectionAccessor = useMemo(() => {
    return {
      id: "select",
      header: (info) => {
        return (
          <CheckboxContainer>
            <Checkbox
              indeterminate={keys?.size > 0 && keys?.size !== columns?.length}
              checked={keys?.size === columns?.length}
              onChange={(e) => {
                onSelectAll(e.target.checked);
              }}
            />
          </CheckboxContainer>
        );
      },
      cell: ({ row }: any) => {
        const key = getRowKey(rowKey, {
          index: row?.index,
          ...row?.original,
        })
        return (
          <CheckboxContainer>
            <Checkbox
              disabled={
                row?.original && rowSelection.checkDisabled
                  ? rowSelection.checkDisabled(row?.original)
                  : false
              }
              checked={keys.has(key)}
              onChange={(e) => {
                const checked = e.target.checked;
                if (checked) {
                  keys.add(key);
                  setSelectedKeys([...Array.from(keys)], "single");
                } else {
                  keys.delete(key);
                  setSelectedKeys(Array.from(keys), "invert");
                }
              }}
            />
          </CheckboxContainer>
        );
      },
    };
  }, [rowSelection]);
  return { rowSelectionAccessor };
};

export default useSelection;
