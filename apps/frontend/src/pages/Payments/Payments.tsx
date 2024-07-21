import { FC } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { usePayments } from "./hooks/usePayments";
import "./styles.modules.css";

export const Payments: FC = () => {
  const { rowData, columns, isPending } = usePayments();

  return (
    <Box className="payments">
      <DataGrid
        rows={rowData}
        columns={columns}
        loading={isPending}
        autoHeight
        disableRowSelectionOnClick
        disableMultipleRowSelection
      />
    </Box>
  );
};
