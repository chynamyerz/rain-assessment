import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";

import { useScreenSize } from "@hooks/useScreenSize";
import { setActiontype, setSelectedOrder } from "@store/orders/ordersSlice";
import { RootState } from "@store/index";
import { Order, OrderItem } from "@store/orders/types";
import { ActionType } from "@store/types";
import { useQuery } from "@tanstack/react-query";
import { queryFnHelper } from "@utils/queryClientHelpers";

export const useOrders = () => {
  const { selectedOrder, actionType } = useSelector(
    (state: RootState) => state.orders
  );
  const { isMediumAndAbove } = useScreenSize();
  const dispatch = useDispatch();
  const columns: GridColDef<Order>[] = useMemo(() => {
    if (isMediumAndAbove) {
      return [
        {
          field: "date",
          headerName: "Date",
          flex: 1,
          valueFormatter: (value) => {
            return dayjs(value).format("YYYY-MM-DD");
          },
        },
        { field: "status", headerName: "Status", flex: 1 },
        {
          field: "items",
          headerName: "Items",
          flex: 1,
          valueFormatter: (value: OrderItem[]) => {
            return value.map((item) => item.item).join(", ");
          },
        },
      ] as GridColDef<Order>[];
    }
    return [
      { field: "name", flex: 1 },
      { field: "status", flex: 1 },
    ] as GridColDef<Order>[];
  }, [isMediumAndAbove]);

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
    handleAction,
    handleSelectedOrder,
  };
};
