import { useState, useEffect, useMemo, useRef } from "react";
import { isTouchStartEvent } from "../utils";

const useColumns = ({ columns, }: any) => {
  const [gridWidths, setGrids] = useState(
    columns?.map((cItem: any) => (cItem.width ? cItem.width : null))
  );

  const gridFixedWidths = useRef(new Array(columns.length).fill(null));
  function handleCalFixed(gridWidths: any) {
    let left = 0;
    let right = 0;
    let values = [];

    for (let i = 0; i < columns.length; i++) {
      const item = columns[i];
      const itemR = columns[columns.length - i];
      if (item.fixed === "left") {
        values[i] = left;
        left += gridWidths[i];
      } else if (itemR.fixed === "right") {
        values[columns.length - i] = right;
        right += gridWidths[columns.length - i];
      } else {
        // values[i] = null
      }
    }
    gridFixedWidths.current = values;
  }
  useEffect(() => {
    handleCalFixed(gridWidths);
  }, [gridWidths]);

  const getColumnOffset = (dataIndex: any) => {
    const index = columns.findIndex((i) => i.dataIndex === dataIndex);
    const value = gridFixedWidths.current?.[index];
    return value || 0;
  };

  const handleCalGridColumns = () => {
    const width = columns?.map((cItem: any) => {
      return cItem.width ? cItem.width : null;
    });
    setGrids(width);
  };

  useEffect(() => {
    handleCalGridColumns();
  }, [columns]);

  function handleResize(info: any) {
    const { header, table } = info;
    const column = table.getColumn(header.column.id);
    const canResize = column?.getCanResize();

    return (e: unknown) => {
      if (!column || !canResize) {
        return;
      }
      (e as any).persist?.();

      if (isTouchStartEvent(e)) {
        if (e.touches && e.touches.length > 1) {
          return;
        }
      }
      const startSize = header.getSize();

      const columnSizingStart: [string, number][] = header
        ? header
            .getLeafHeaders()
            .map((d: { column: { id: any; getSize: () => any } }) => [
              d.column.id,
              d.column.getSize(),
            ])
        : [[column.id, column.getSize()]];

      const clientX = isTouchStartEvent(e)
        ? Math.round(e.touches[0]!.clientX)
        : (e as MouseEvent).clientX;

      const newColumnSizing: any = {};

      const updateOffset = (eventType: "move" | "end", clientXPos?: number) => {
        if (typeof clientXPos !== "number") {
          return;
        }

        table.setColumnSizingInfo(
          (old: {
            startOffset: any;
            startSize: any;
            columnSizingStart: [any, any][];
          }) => {
            const deltaDirection =
              table.options.columnResizeDirection === "rtl" ? -1 : 1;
            const deltaOffset =
              (clientXPos - (old?.startOffset ?? 0)) * deltaDirection;
            const deltaPercentage = Math.max(
              deltaOffset / (old?.startSize ?? 0),
              -0.999999
            );

            old.columnSizingStart.forEach(([columnId, headerSize]) => {
              newColumnSizing[columnId] =
                Math.round(
                  Math.max(headerSize + headerSize * deltaPercentage, 0) * 100
                ) / 100;
            });

            return {
              ...old,
              deltaOffset,
              deltaPercentage,
            };
          }
        );

        if (
          table.options.columnResizeMode === "onChange" ||
          eventType === "end"
        ) {
          const gCwidth = table
            .getAllColumns()
            .map((column: { getSize: () => any }) => {
              return column.getSize() ? column.getSize() : null;
            });
          setGrids(gCwidth);
          table.setColumnSizing((old: any) => ({
            ...old,
            ...newColumnSizing,
          }));
        }
      };

      const onMove = (clientXPos?: number) => updateOffset("move", clientXPos);

      const onEnd = (clientXPos?: number) => {
        updateOffset("end", clientXPos);

        table.setColumnSizingInfo((old: any) => ({
          ...old,
          isResizingColumn: false,
          startOffset: null,
          startSize: null,
          deltaOffset: null,
          deltaPercentage: null,
          columnSizingStart: [],
        }));
      };

      const contextDocument = typeof document !== "undefined" ? document : null;

      const mouseEvents = {
        moveHandler: (e: MouseEvent) => onMove(e.clientX),
        upHandler: (e: MouseEvent) => {
          contextDocument?.removeEventListener(
            "mousemove",
            mouseEvents.moveHandler
          );
          contextDocument?.removeEventListener(
            "mouseup",
            mouseEvents.upHandler
          );
          onEnd(e.clientX);
        },
      };

      const touchEvents = {
        moveHandler: (e: TouchEvent) => {
          if (e.cancelable) {
            e.preventDefault();
            e.stopPropagation();
          }
          onMove(e.touches[0]!.clientX);
          return false;
        },
        upHandler: (e: TouchEvent) => {
          contextDocument?.removeEventListener(
            "touchmove",
            touchEvents.moveHandler
          );
          contextDocument?.removeEventListener(
            "touchend",
            touchEvents.upHandler
          );
          if (e.cancelable) {
            e.preventDefault();
            e.stopPropagation();
          }
          onEnd(e.touches[0]?.clientX);
        },
      };

      const passiveIfSupported = false;
      // passiveEventSupported()
      //   ? { passive: false }
      //   :
      //   false

      if (isTouchStartEvent(e)) {
        contextDocument?.addEventListener(
          "touchmove",
          touchEvents.moveHandler,
          passiveIfSupported
        );
        contextDocument?.addEventListener(
          "touchend",
          touchEvents.upHandler,
          passiveIfSupported
        );
      } else {
        contextDocument?.addEventListener(
          "mousemove",
          mouseEvents.moveHandler,
          passiveIfSupported
        );
        contextDocument?.addEventListener(
          "mouseup",
          mouseEvents.upHandler,
          passiveIfSupported
        );
      }

      table.setColumnSizingInfo((old: any) => ({
        ...old,
        startOffset: clientX,
        startSize,
        deltaOffset: 0,
        deltaPercentage: 0,
        columnSizingStart,
        isResizingColumn: column.id,
      }));
    };
  }
  return {
    handleResize,
    gridWidths,
    gridFixedWidths: gridFixedWidths.current,
    getColumnOffset,
  };
};
export default useColumns;
