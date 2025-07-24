'use client';

import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <>
      <h1>Добро пожаловать!</h1>
      <button className='btn' onClick={handleLogout}>
        Выход
      </button>
    </>
  );
};

export default Dashboard;
