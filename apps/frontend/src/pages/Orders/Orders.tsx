import { FC } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Add, ChevronLeft, DeleteForever, Edit } from "@mui/icons-material";

import { Order } from "@store/orders/types";
import { useOrders } from "./hooks/useOders";
import "./styles.modules.css";
import { AddOrder } from "./components/AddOrder/AddOrder";
import { EditOrder } from "./components/EditOrder/EditOrder";
import { DeleteOrder } from "./components/DeleteOrder/DeleteOrder";

export const Orders: FC = () => {
  const {
    selectedOrder,
    actionType,
    rowData,
    columns,
    handleAction,
    handleSelectedOrder,
    handleNavigateback,
  } = useOrders();

  return (
    <Box className="oders">
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
        {selectedOrder && (
          <Button
            variant="outlined"
            color="warning"
            startIcon={<Edit />}
            onClick={() => handleAction("edit")}
          >
            Edit
          </Button>
        )}
        {selectedOrder && (
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
            const rowData = details.api.getRow<Order>(row[0]);
            handleSelectedOrder(rowData);
          }}
        />
      </Box>

      {actionType === "add" && <AddOrder />}
      {actionType === "edit" && <EditOrder />}
      {actionType === "delete" && <DeleteOrder />}
    </Box>
  );
};
