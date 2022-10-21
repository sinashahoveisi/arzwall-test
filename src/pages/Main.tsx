import {Link, NavLink, Outlet} from 'react-router-dom';
import type {FC} from 'react';
import useUser from '@/hooks/user/useUser';

const Main: FC = () => {
  const {user} = useUser();

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-auth bg-cover bg-left-top bg-no-repeat">
      <div className="max-h-[90%] w-max rounded border border-pen-light bg-[#161a1e90] p-8 pb-12 lg:p-20 lg:pb-32">
        <Outlet />
      </div>
    </main>
  );
};

export default Main;
