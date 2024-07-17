import { FC } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { SignalWifi1Bar } from '@mui/icons-material';
import classnames from 'classnames';

import { AccountProps } from './types';
import './styles.modules.css';

export const Account: FC<AccountProps> = ({ name, status }) => {
  const cssStatusClasses = classnames(status);
  return (
    <Card className="account-container">
      <CardContent className="account-content">
        <Box className="account-name-container">
          <Typography variant="h6">{name}</Typography>
        </Box>
        <Box className="account-status-container">
          <Typography variant="subtitle1">Acoount status</Typography>
          <SignalWifi1Bar className={cssStatusClasses} />
        </Box>
      </CardContent>
    </Card>
  );
};
