import { FC } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Add, ChevronLeft } from "@mui/icons-material";

import { usePayments } from "./hooks/usePayments";
import { AddPayment } from "./components/AddPayment/AddPayment";
import "./styles.modules.css";

export const Payments: FC = () => {
  const { actionType, rowData, columns, handleAction, handleNavigateback } =
    usePayments();

  return (
    <Box className="payments">
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
      </Box>
      <Box>
        <DataGrid
          rows={rowData}
          columns={columns}
          autoHeight
          disableRowSelectionOnClick
          disableMultipleRowSelection
        />
      </Box>

      {actionType === "add" && <AddPayment />}
    </Box>
  );
};
