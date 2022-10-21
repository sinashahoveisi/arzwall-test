import {Outlet} from 'react-router-dom';
import type {FC} from 'react';
import useUser from '@/hooks/user/useUser';

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
      <nav className="rounded border-gray-200 bg-gray-900 px-2 py-2.5 sm:px-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <a href="https://flowbite.com/" className="flex items-center">
            <img src="https://flowbite.com/docs/images/logo.svg" className="ml-3 h-6 sm:h-9" alt="Flowbite Logo" />
            <span className="self-center whitespace-nowrap text-xl font-semibold text-white">ارزوال</span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-400 hover:bg-gray-100 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-gray-600 md:hidden"
            aria-controls="navbar-default"
            aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 border-gray-700 bg-gray-50 bg-gray-800 p-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:bg-gray-900 md:text-sm md:font-medium">
              <li>
                <span className="block rounded py-2 pr-4 pl-3  text-white">داشبورد</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Main;
