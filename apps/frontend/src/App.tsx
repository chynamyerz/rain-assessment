import { Navigate, Route, Routes } from "react-router-dom";
import { Box, CircularProgress, Divider } from "@mui/material";

import { NavBar } from "@components/NavBar/NavBar";
import { Home } from "@pages/Home/Home";
import { Dashboard } from "@pages/Dashboard/Dashboard";
import { Services } from "@pages/Services/Services";
import { Orders } from "@pages/Orders/Orders";
import { Payments } from "@pages/Payments/Payments";
import { useApp } from "@hooks/useApp";
import "./styles.modules.css";

function App() {
  const { data, isPending } = useApp();

  return (
    <Box className="app-container">
      {isPending ? (
        <Box className="loading-container">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <NavBar user={data?.user} />
          <Divider />
          <Routes>
            {!data?.user && <Route path="/" element={<Home />} />}
            {data?.user && <Route path="/dashboard" element={<Dashboard />} />}
            {data?.user && <Route path="/services" element={<Services />} />}
            {data?.user && <Route path="/orders" element={<Orders />} />}
            {data?.user && <Route path="/payments" element={<Payments />} />}

            <Route
              path="*"
              element={
                <Navigate to={data?.user ? "/dashboard" : "/"} replace />
              }
            />
          </Routes>
        </>
      )}
    </Box>
  );
}

export default App;
