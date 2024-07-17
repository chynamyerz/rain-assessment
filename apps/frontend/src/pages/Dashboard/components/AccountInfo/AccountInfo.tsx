import { FC } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

import { AccountInfoProps } from './types';
import './styles.modules.css';

export const AccountInfo: FC<AccountInfoProps> = ({ title, subtitle }) => {
  return (
    <Card className="account-info-container">
      <CardContent>
        <Box>
          <Typography className="account-info-title" variant="h6">
            {title}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1">{subtitle}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
