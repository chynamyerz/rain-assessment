import { FC } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  FormControlLabel,
  TextField,
} from "@mui/material";

import "./styles.modules.css";
import { useHome } from "./hooks/useHome";

export const Home: FC = () => {
  const {
    email,
    password,
    isPending,
    isError,
    isNewUser,
    handleSubmit,
    handleNewUser,
    handleEmailChange,
    handlePasswordChange,
  } = useHome();
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
          {isError && (
            <Chip
              label="Something went wrong, please try again"
              color="error"
              variant="outlined"
            />
          )}
          <TextField
            label="Email address"
            variant="outlined"
            onChange={handleEmailChange}
            value={email}
          />
          <TextField
            label="Password"
            variant="outlined"
            onChange={handlePasswordChange}
            value={password}
          />
          <FormControlLabel
            control={<Checkbox checked={isNewUser} onChange={handleNewUser} />}
            label="Are you new?"
          />
          {!isNewUser && (
            <Button
              variant="contained"
              disabled={isPending}
              onClick={handleSubmit}
            >
              {isPending ? "Loading..." : "Sign in"}
            </Button>
          )}
          {isNewUser && (
            <Button
              variant="contained"
              disabled={isPending}
              onClick={handleSubmit}
            >
              {isPending ? "Loading..." : "Sign up"}
            </Button>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};
