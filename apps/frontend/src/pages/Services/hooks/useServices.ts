import { useMemo, useState } from "react";
import { ActionType } from "../types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Service } from "../../../store/services/types";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useMediaQuery, useTheme } from "@mui/material";

export const useServices = () => {
  const [action, setAction] = useState<ActionType>();
  const { services } = useSelector((state: RootState) => state.services);
  const navigate = useNavigate();
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
    switch (actionType) {
      case "add":
        setAction("add");
        break;
      case "edit":
        setAction("edit");
        break;
      case "delete":
        setAction("delete");
        break;
      default:
        setAction(undefined);
        return;
    }
  };

  const handleNavigateback = () => {
    navigate(-1);
  };

  return {
    action,
    rowData,
    columns,
    handleAction,
    handleNavigateback,
  };
};
