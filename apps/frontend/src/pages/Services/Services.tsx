import { FC } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Add, DeleteForever, Edit } from "@mui/icons-material";

import { Service } from "@store/services/types";
import { useServices } from "./hooks/useServices";
import { DeleteService } from "./components/DeleteService/DeleteService";
import { EditService } from "./components/EditService/EditService";
import "./styles.modules.css";
import { AddOrder } from "@pages/Orders/components/AddOrder/AddOrder";

export const Services: FC = () => {
  const {
    selectedService,
    actionType,
    rowData,
    columns,
    isPending,
    orderActionType,
    handleAction,
    handleSelectedService,
  } = useServices();

  return (
    <Box className="services">
      <Box className="action-buttons">
        <Button
          variant="outlined"
          color="success"
          startIcon={<Add />}
          onClick={() => handleAction("add")}
        >
          Order new service
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
          loading={isPending}
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

      {orderActionType === "add" && <AddOrder />}
      {actionType === "edit" && <EditService />}
      {actionType === "delete" && <DeleteService />}
    </Box>
  );
};
