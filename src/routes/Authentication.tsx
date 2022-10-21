import {Navigate, Route, Routes} from 'react-router-dom';
import RegisterPage from '@/pages/Authentication/Register';
import LoginPage from '@/pages/Authentication/Login';

const Authentication = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default Authentication;
