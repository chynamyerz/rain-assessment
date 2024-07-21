import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GridColDef, useGridApiRef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { useScreenSize } from "@hooks/useScreenSize";
import { setActiontype, setSelectedOrder } from "@store/orders/ordersSlice";
import { RootState } from "@store/index";
import { Order, OrderItem } from "@store/orders/types";
import { ActionType } from "@store/types";
import { queryFnHelper } from "@utils/queryClientHelpers";

export const useOrders = () => {
  const { selectedOrder, actionType } = useSelector(
    (state: RootState) => state.orders
  );
  const { isMediumAndAbove } = useScreenSize();
  const gridApiRef = useGridApiRef();
  const dispatch = useDispatch();
  const columns: GridColDef<Order>[] = useMemo(
    () => getColumns(),
    [isMediumAndAbove]
  );

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    if (gridApiRef.current?.getSelectedRows?.().size > 0 && !selectedOrder) {
      gridApiRef.current.getSelectedRows().forEach((row) => {
        gridApiRef.current.selectRow(row.id, false);
      });
    }
  }, [selectedOrder, gridApiRef]);

  /**
   *
   * Queries
   *
   */
  const { isPending, data } = useQuery<{ orders: Order[] }>({
    queryKey: ["Orders"],
    queryFn: async () => {
      return queryFnHelper<{ orders: Order[] }>("/orders");
    },
  });

  /**
   *
   * Handlers
   *
   */

  function getColumns() {
    const dateCol: GridColDef<Order> = {
      field: "date",
      headerName: "Date",
      flex: 1,
      valueFormatter: (value) => {
        return dayjs(value).format("YYYY-MM-DD");
      },
    };
    const statusCol: GridColDef<Order> = {
      field: "status",
      headerName: "Status",
      flex: 1,
    };
    const columns: GridColDef<Order>[] = [dateCol, statusCol];
    if (isMediumAndAbove) {
      return [
        ...columns,
        {
          field: "items",
          headerName: "Items",
          flex: 1,
          valueFormatter: (value: OrderItem[]) => {
            return value.map((item) => item.item).join(", ");
          },
        } as GridColDef<Order>,
      ];
    }
    return columns;
  }

  const handleAction = (actionType: ActionType) => {
    dispatch(setActiontype(actionType));
  };

  const handleSelectedOrder = (order: Order | undefined | null) => {
    dispatch(setSelectedOrder(order));
  };

  return {
    actionType,
    rowData: data?.orders || [],
    columns,
    selectedOrder,
    isPending,
    gridApiRef,
    handleAction,
    handleSelectedOrder,
  };
};
