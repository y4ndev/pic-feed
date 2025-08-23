'use client';

import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import Profile from '@/components/Profile/Profile';
import useAuthStore from '@/store/AuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Dashboard = () => {
  const { username, setUsername } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem('username');
    setUsername(name || '');
  }, [setUsername]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <>
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    </>
  );
};

export default Dashboard;
