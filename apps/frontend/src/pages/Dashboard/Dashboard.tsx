import { FC } from "react";
import { Box } from "@mui/material";

import { LoadingSpinner } from "@components/LoadingSpinner/LoadingSpinner";
import { Account } from "./components/Account/Account";
import { AccountInfo } from "./components/AccountInfo/AccountInfo";
import { useDashBoard } from "./components/hooks/useDashboard";
import { AccountStatus } from "./components/Account/types";
import "./styles.modules.css";

export const Dashboard: FC = () => {
  const { account, user, isPending, getBalance, getDueDate } = useDashBoard();

  return isPending ? (
    <LoadingSpinner />
  ) : (
    <Box className="dashboard">
      <Box className="dashboard-account-container">
        <Account
          email={user?.email || ""}
          status={(account?.status as AccountStatus) || "inactive"}
        />
      </Box>

      <Box className="dashboard-account-info-container">
        <AccountInfo title="Balance" subtitle={getBalance(account?.balance)} />
        <AccountInfo title="Due date" subtitle={getDueDate(account?.dueDate)} />
      </Box>
    </Box>
  );
};
