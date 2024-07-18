import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useMediaQuery, useTheme } from "@mui/material";

import { RootState } from "../../../store";
import { ActionType, Service } from "../../../store/services/types";

import {
  setActiontype,
  setSelectedService,
} from "../../../store/services/servicesSlice";

export const useServices = () => {
  const { services, selectedService, actionType } = useSelector(
    (state: RootState) => state.services
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMediumAndAbove = useMediaQuery(theme.breakpoints.up("sm"));
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
  const rowData: GridRowsProp<Service> = services;

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
    rowData,
    columns,
    selectedService,
    handleAction,
    handleSelectedService,
    handleNavigateback,
  };
};
