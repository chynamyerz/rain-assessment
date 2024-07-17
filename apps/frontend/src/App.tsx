import { Navigate, Route, Routes } from 'react-router-dom';
import { Box, Divider } from '@mui/material';

import { Dashboard, Home, Orders, Payments, Services } from './pages';
import { NavBar } from './components';
import './styles.modules.css';

function App() {
  return (
    <Box className="app-container">
      <NavBar />
      <Divider />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/services" element={<Services />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payments" element={<Payments />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Box>
  );
}

export default App;