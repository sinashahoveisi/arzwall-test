import {Route, Routes} from 'react-router-dom';
import BucketsPage from '@/pages/dashboard/Dashboard';

const Dashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<BucketsPage />} />
    </Routes>
  );
};

export default Dashboard;
