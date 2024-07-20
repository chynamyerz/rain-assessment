import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GridColDef } from "@mui/x-data-grid";

import { useScreenSize } from "@hooks/useScreenSize";
import {
  setActiontype,
  setSelectedService,
} from "@store/services/servicesSlice";
import { RootState } from "@store/index";
import { Service } from "@store/services/types";
import { ActionType } from "@store/types";
import { useQuery } from "@tanstack/react-query";
import { queryFnHelper } from "@utils/queryClientHelpers";

export const useServices = () => {
  const { actionType, selectedService } = useSelector(
    (state: RootState) => state.services
  );
  const { isMediumAndAbove } = useScreenSize();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const columns: GridColDef<Service>[] = useMemo(() => {
    if (isMediumAndAbove) {
      return [
        { field: "name", headerName: "Name", flex: 1 },
        { field: "status", headerName: "Status", flex: 1 },
        { field: "details", headerName: "Details", flex: 1 },
      ] as GridColDef<Service>[];
    }
    return [
      { field: "name", flex: 1 },
      { field: "status", flex: 1 },
    ] as GridColDef<Service>[];
  }, [isMediumAndAbove]);

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

  const handleAction = (actionType: ActionType) => {
    dispatch(setActiontype(actionType));
  };

  const handleSelectedService = (service: Service | undefined | null) => {
    dispatch(setSelectedService(service));
  };

  const handleNavigateback = () => {
    navigate(-1);
  };

  return {
    actionType,
    rowData: data?.services || [],
    columns,
    selectedService,
    isPending,
    handleAction,
    handleSelectedService,
    handleNavigateback,
  };
};
