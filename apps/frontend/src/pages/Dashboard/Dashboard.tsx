import { FC } from "react";
import { Box } from "@mui/material";

import { Account } from "./components/Account/Account";
import { AccountInfo } from "./components/AccountInfo/AccountInfo";
import "./styles.modules.css";

export const Dashboard: FC = () => {
  return (
    <Box className="dashboard">
      <Box className="dashboard-account-container">
        <Account name="Full name" status="active" />
      </Box>

      <Box className="dashboard-account-info-container">
        <AccountInfo title="Balance" subtitle="R120.00" />
        <AccountInfo title="Due date" subtitle="Monday, December 31, 2024" />
      </Box>
    </Box>
  );
};
