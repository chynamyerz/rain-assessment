import { Navigate, Route, Routes } from 'react-router-dom';
import { NavBar } from './components';
import { Dashboard, Home, Orders, Payments, Services } from './pages';
import { Stack } from '@mui/material';

function App() {
  return (
    <Stack padding={5} gap={5}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/services" element={<Services />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payments" element={<Payments />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Stack>
  );
}

export default App;
