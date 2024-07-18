import { FC, useMemo, useState } from "react";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import { DataGrid, type GridColDef, type GridRowsProp } from "@mui/x-data-grid";
import { Add, ChevronLeft, DeleteForever, Edit } from "@mui/icons-material";

import "./styles.modules.css";
import { useServices } from "./hooks/useServices";
import { AddService, DeleteService, EditService } from "./components";

interface ServicesRowData {
  id: number;
  name: string;
  status: string;
  details: string;
}
export const Services: FC = () => {
  const [selectedRow, setSelectedRow] = useState<ServicesRowData | null>();
  const { action, handleAction, handleNavigateback } = useServices();
  const theme = useTheme();
  const isMediumAndAbove = useMediaQuery(theme.breakpoints.up("sm"));

  const rows: GridRowsProp<ServicesRowData> = [
    { id: 1, name: "Hello", status: "World", details: "Details" },
    { id: 2, name: "Hello", status: "World", details: "Details" },
    { id: 3, name: "Hello", status: "World", details: "Details" },
  ];

  const columns: GridColDef<ServicesRowData>[] = useMemo(() => {
    if (isMediumAndAbove) {
      return [
        { field: "name", headerName: "Name", flex: 1 },
        { field: "status", headerName: "Status", flex: 1 },
        { field: "details", headerName: "Details", flex: 1 },
      ] as GridColDef<ServicesRowData>[];
    }
    return [
      { field: "name", flex: 1 },
      { field: "status", flex: 1 },
    ];
  }, [isMediumAndAbove]);

  return (
    <Box className="services">
      <Box>
        <Button
          variant="outlined"
          startIcon={<ChevronLeft />}
          onClick={handleNavigateback}
        >
          Back
        </Button>
      </Box>
      <Box className="action-buttons">
        <Button
          variant="outlined"
          color="success"
          startIcon={<Add />}
          onClick={() => handleAction("add")}
        >
          Add
        </Button>
        {selectedRow && (
          <Button
            variant="outlined"
            color="warning"
            startIcon={<Edit />}
            onClick={() => handleAction("edit")}
          >
            Edit
          </Button>
        )}
        {selectedRow && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteForever />}
            onClick={() => handleAction("delete")}
          >
            Delete
          </Button>
        )}
      </Box>
      <Box>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          checkboxSelection
          disableRowSelectionOnClick
          disableMultipleRowSelection
          onRowSelectionModelChange={(row, details) => {
            const rowData = details.api.getRow<ServicesRowData>(row[0]);
            setSelectedRow(rowData);
          }}
        />
      </Box>

      {action === "add" && <AddService setAction={handleAction} />}
      {action === "edit" && <EditService setAction={handleAction} />}
      {action === "delete" && <DeleteService setAction={handleAction} />}
    </Box>
  );
};
