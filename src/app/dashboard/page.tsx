'use client';

import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <>
      <PrivateRoute>
        <h1>Добро пожаловать!</h1>
        <button className='btn' onClick={handleLogout}>
          Выход
        </button>
      </PrivateRoute>
    </>
  );
};

export default Dashboard;
