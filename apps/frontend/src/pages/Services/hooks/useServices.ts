import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";

import { useScreenSize } from "@hooks/useScreenSize";
import {
  setActiontype,
  setSelectedService,
} from "@store/services/servicesSlice";
import { setActiontype as setOrderActionType } from "@store/orders/ordersSlice";

import { RootState } from "@store/index";
import { Service } from "@store/services/types";
import { ActionType } from "@store/types";
import { queryFnHelper } from "@utils/queryClientHelpers";

export const useServices = () => {
  const { actionType, selectedService } = useSelector(
    (state: RootState) => state.services
  );
  const { actionType: orderActionType } = useSelector(
    (state: RootState) => state.orders
  );
  const { isMediumAndAbove } = useScreenSize();
  const dispatch = useDispatch();

  const columns: GridColDef<Service>[] = useMemo(
    () => getColumns(),
    [isMediumAndAbove]
  );

  /**
   *
   * Queries
   *
   */
  const { isPending, data } = useQuery<{ services: Service[] }>({
    queryKey: ["Services"],
    queryFn: async () => {
      return queryFnHelper<{ services: Service[] }>("/services");
    },
  });

  /**
   *
   * Handlers
   *
   */

  function getColumns() {
    const nameCol: GridColDef<Service> = {
      field: "name",
      headerName: "Name",
      flex: 1,
    };
    const statusCol: GridColDef<Service> = {
      field: "status",
      headerName: "Status",
      flex: 1,
    };
    const columns: GridColDef<Service>[] = [nameCol, statusCol];
    if (isMediumAndAbove) {
      return [
        ...columns,
        {
          field: "details",
          headerName: "Details",
          flex: 1,
        } as GridColDef<Service>,
      ];
    }
    return columns;
  }

  const handleAction = (actionType: ActionType) => {
    if (actionType === "add") {
      dispatch(setOrderActionType(actionType));
      return;
    }
    dispatch(setActiontype(actionType));
  };

  const handleSelectedService = (service: Service | undefined | null) => {
    dispatch(setSelectedService(service));
  };

  return {
    actionType,
    orderActionType,
    rowData: data?.services || [],
    columns,
    selectedService,
    isPending,
    handleAction,
    handleSelectedService,
  };
};
