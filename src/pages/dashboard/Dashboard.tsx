import type {FC} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '@/components/button/Button';
import useUser from '@/hooks/user/useUser';

const Dashboard: FC = () => {
  const user = useUser();
  const navigate = useNavigate();

  const onLogout = () => {
    user.setUser({is_logged_in: false});
    navigate('/login', {replace: true});
  };
  return (
    <main className="mt-48 flex flex-col items-center justify-center">
      <h2 className="text">به ارزوال خوش آمدید</h2>
      <Button title="خروج از حساب کاربری" className="!px-6" variant="danger" onClick={onLogout} />
    </main>
  );
};

export default Dashboard;
