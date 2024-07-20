import { Navigate, Route, Routes } from "react-router-dom";
import { Box, Divider } from "@mui/material";

import { NavBar } from "@components/NavBar/NavBar";
import { Home } from "@pages/Home/Home";
import { Dashboard } from "@pages/Dashboard/Dashboard";
import { Services } from "@pages/Services/Services";
import { Orders } from "@pages/Orders/Orders";
import { Payments } from "@pages/Payments/Payments";
import { LoadingSpinner } from "@components/LoadingSpinner/LoadingSpinner";
import { useApp } from "@hooks/useApp";
import "./styles.modules.css";

function App() {
  const { user, isPending } = useApp();

  return (
    <Box className="app-container">
      <NavBar user={user} />
      <Divider />
      {isPending ? (
        <LoadingSpinner />
      ) : (
        <Routes>
          {!user && <Route path="/" element={<Home />} />}
          {user && <Route path="/dashboard" element={<Dashboard />} />}
          {user && <Route path="/services" element={<Services />} />}
          {user && <Route path="/orders" element={<Orders />} />}
          {user && <Route path="/payments" element={<Payments />} />}

          <Route
            path="*"
            element={<Navigate to={user ? "/dashboard" : "/"} replace />}
          />
        </Routes>
      )}
    </Box>
  );
}

export default App;
