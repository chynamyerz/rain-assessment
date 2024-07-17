import { FC } from 'react';
import { Box, Button, Card, CardContent, TextField } from '@mui/material';

import './styles.modules.css';

export const Home: FC = () => {
  return (
    <Box className="home">
      <Box className="logo-image">
        <img
          src="/rain-logo.png"
          alt="Logo"
          loading="lazy"
          width="100%"
          height="100%"
        />
      </Box>
      <Card className="auth-container">
        <CardContent className="auth-content">
          <TextField label="Email address" variant="outlined" />

          <TextField label="Password" variant="outlined" />

          <Button variant="contained">Sign in</Button>
        </CardContent>
      </Card>
    </Box>
  );
};
