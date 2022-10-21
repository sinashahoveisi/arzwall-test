import {Outlet} from 'react-router-dom';
import type {FC} from 'react';
import useUser from '@/hooks/user/useUser';
import Navbar from '@/containers/dashboard/Navbar';

const Main: FC = () => {
  const {user} = useUser();

  if (!user?.is_logged_in)
    return (
      <main className="flex h-screen w-screen items-center justify-center bg-auth bg-cover bg-left-top bg-no-repeat">
        <div className="max-h-[90%] w-max rounded border border-pen-light bg-[#161a1e90] p-8 pb-12 lg:p-20 lg:pb-32">
          <Outlet />
        </div>
      </main>
    );
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Main;
