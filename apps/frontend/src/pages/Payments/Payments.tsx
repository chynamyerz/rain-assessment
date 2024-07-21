import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { usePayments } from "./hooks/usePayments";
import "./styles.modules.css";

export const Payments: FC = () => {
  const { rowData, columns, isPending } = usePayments();

  return (
    <Box className="payments">
      <Box className="payments-grid-container">
        {rowData.length === 0 ? (
          <Box className="empty-data">
            <img src="/no-data.png" width={250} />
            <Typography variant="body2">
              You do not have any payments.
            </Typography>
          </Box>
        ) : (
          <DataGrid
            rows={rowData}
            columns={columns}
            loading={isPending}
            disableRowSelectionOnClick
            disableMultipleRowSelection
          />
        )}
      </Box>
    </Box>
  );
};
