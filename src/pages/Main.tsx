import {Link, NavLink, Outlet} from 'react-router-dom';
import type {FC} from 'react';
import useUser from '@/hooks/user/useUser';

const Main: FC = () => {
  const {user} = useUser();

  return (
    <main className="h-screen w-screen bg-auth">
      <div>
        <Outlet />
      </div>
    </main>
  );
};

export default Main;
