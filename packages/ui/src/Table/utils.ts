import React from "react";
import { ColumnsType, TableCellsType } from "./interface";
function toArray<T>(arr: T | readonly T[]): T[] {
  if (arr === undefined || arr === null) {
    return [];
  }
  return (Array.isArray(arr) ? arr : [arr]) as T[];
}
export function convertChildrenToColumns<RecordType>(
  children: React.ReactNode
): ColumnsType<RecordType> {
  return toArray(children)
    .filter((node) => React.isValidElement(node))
    .map(({ key, props }: React.ReactElement) => {
      const { children: nodeChildren, ...restProps } = props;
      const column = {
        key,
        ...restProps,
      };

      if (nodeChildren) {
        column.children = convertChildrenToColumns(nodeChildren);
      }

      return column;
    });
}

export function convertChildrenToDatas(children: React.ReactNode): any {
  return toArray(children)
    .filter((node) => React.isValidElement(node))
    .map(({ key, props }: React.ReactElement) => {
      const { children: nodeChildren, ...restProps } = props;
      const value = {};
      if (nodeChildren instanceof Array) {
        Object.assign(value, ...convertChildrenToDatas(nodeChildren));
      } else {
        value[key] = nodeChildren;
      }

      return value;
    });
}

export function isTouchStartEvent(e: unknown): e is TouchEvent {
  return (e as TouchEvent).type === "touchstart";
}

export const getRowKey = (rowKey: string | Function, record: any) => {
  if (typeof rowKey === 'function') {
    return rowKey
  }
  const key = record && record[rowKey]
  return key
}
