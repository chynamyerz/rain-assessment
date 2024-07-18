import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";

import { useScreenSize } from "@hooks/useScreenSize";
import { setActiontype } from "@store/payments/paymentsSlice";
import { RootState } from "@store/index";
import { Payment } from "@store/payments/types";
import { ActionType } from "@store/types";

export const usePayments = () => {
  const { payments, actionType } = useSelector(
    (state: RootState) => state.payments
  );
  const { isMediumAndAbove } = useScreenSize();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const columns: GridColDef<Payment>[] = useMemo(() => {
    if (isMediumAndAbove) {
      return [
        { field: "date", headerName: "Date", flex: 1 },
        { field: "status", headerName: "Status", flex: 1 },
        { field: "amount", headerName: "Amount", flex: 1 },
      ] as GridColDef<Payment>[];
    }
    return [
      { field: "name", flex: 1 },
      { field: "status", flex: 1 },
    ] as GridColDef<Payment>[];
  }, [isMediumAndAbove]);
  const rowData: GridRowsProp<Payment> = payments;

  const handleAction = (actionType: ActionType) => {
    dispatch(setActiontype(actionType));
  };

  const handleNavigateback = () => {
    navigate(-1);
  };

  return {
    actionType,
    rowData,
    columns,
    handleAction,
    handleNavigateback,
  };
};
