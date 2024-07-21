import { FC } from "react";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Add, DeleteForever } from "@mui/icons-material";

import { Order } from "@store/orders/types";
import { useOrders } from "./hooks/useOders";
import { AddOrder } from "./components/AddOrder/AddOrder";
import { DeleteOrder } from "./components/DeleteOrder/DeleteOrder";
import "./styles.modules.css";

export const Orders: FC = () => {
  const {
    selectedOrder,
    actionType,
    rowData,
    columns,
    isPending,
    gridApiRef,
    handleAction,
    handleSelectedOrder,
  } = useOrders();

  return (
    <Box className="oders">
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
            color="error"
            startIcon={<DeleteForever />}
            onClick={() => handleAction("delete")}
          >
            Delete
          </Button>
        )}
      </Box>
      <Box className="orders-grid-container">
        {rowData.length === 0 ? (
          <Box className="empty-data">
            <img src="/no-data.png" width={250} />
            <Typography variant="body2">You do not have any orders.</Typography>
          </Box>
        ) : (
          <DataGrid
            rows={rowData}
            columns={columns}
            loading={isPending}
            checkboxSelection
            disableRowSelectionOnClick
            disableMultipleRowSelection
            onRowSelectionModelChange={(row, details) => {
              const rowData = details.api.getRow<Order>(row[0]);
              handleSelectedOrder(rowData);
            }}
            apiRef={gridApiRef}
          />
        )}
      </Box>

      {actionType === "add" && <AddOrder />}
      {actionType === "delete" && <DeleteOrder />}
    </Box>
  );
};
