import {Route, Routes, Navigate} from 'react-router-dom';
import Dashboard from './Dashboard';
import Authentication from './Authentication';
import Main from '@/pages/Main';
import useUser from "@/hooks/user/useUser";

const MyRoutes = () => {

    const {user} = useUser();

  return (
    <Routes>
      <Route element={<Main />}>
        <Route path="/*" element={user?.is_logged_in ? <Dashboard /> : <Authentication />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default MyRoutes;
