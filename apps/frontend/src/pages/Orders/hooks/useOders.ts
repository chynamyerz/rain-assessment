import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";

import { useScreenSize } from "@hooks/useScreenSize";
import { setActiontype, setSelectedOrder } from "@store/orders/ordersSlice";
import { RootState } from "@store/index";
import { Order } from "@store/orders/types";
import { ActionType } from "@store/types";

export const useOrders = () => {
  const { orders, selectedOrder, actionType } = useSelector(
    (state: RootState) => state.orders
  );
  const { isMediumAndAbove } = useScreenSize();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const columns: GridColDef<Order>[] = useMemo(() => {
    if (isMediumAndAbove) {
      return [
        { field: "date", headerName: "Date", flex: 1 },
        { field: "status", headerName: "Status", flex: 1 },
        { field: "item", headerName: "Items", flex: 1 },
      ] as GridColDef<Order>[];
    }
    return [
      { field: "name", flex: 1 },
      { field: "status", flex: 1 },
    ] as GridColDef<Order>[];
  }, [isMediumAndAbove]);
  const rowData: GridRowsProp<Order> = orders;

  const handleAction = (actionType: ActionType) => {
    dispatch(setActiontype(actionType));
  };

  const handleSelectedOrder = (order: Order | undefined | null) => {
    dispatch(setSelectedOrder(order));
  };

  const handleNavigateback = () => {
    navigate(-1);
  };

  return {
    actionType,
    rowData,
    columns,
    selectedOrder,
    handleAction,
    handleSelectedOrder,
    handleNavigateback,
  };
};
