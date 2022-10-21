import {Navigate, Route, Routes} from 'react-router-dom';
import DashboardPage from '@/pages/dashboard/Dashboard';

const Dashboard = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default Dashboard;
