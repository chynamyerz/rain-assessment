import { FC } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Add, ChevronLeft, DeleteForever, Edit } from "@mui/icons-material";

import { useServices } from "./hooks/useServices";
import { AddService, DeleteService, EditService } from "./components";
import { Service } from "../../store/services/types";
import "./styles.modules.css";

export const Services: FC = () => {
  const {
    selectedService,
    actionType,
    rowData,
    columns,
    handleAction,
    handleSelectedService,
    handleNavigateback,
  } = useServices();

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
        {selectedService && (
          <Button
            variant="outlined"
            color="warning"
            startIcon={<Edit />}
            onClick={() => handleAction("edit")}
          >
            Edit
          </Button>
        )}
        {selectedService && (
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
          rows={rowData}
          columns={columns}
          autoHeight
          checkboxSelection
          disableRowSelectionOnClick
          disableMultipleRowSelection
          onRowSelectionModelChange={(row, details) => {
            const rowData = details.api.getRow<Service>(row[0]);
            handleSelectedService(rowData);
          }}
        />
      </Box>

      {actionType === "add" && <AddService />}
      {actionType === "edit" && <EditService />}
      {actionType === "delete" && <DeleteService />}
    </Box>
  );
};
