'use client';

import useAuthStore from '@/store/AuthStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const { isAuth, setIsAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuth(false);
      router.push('/login');
    } else {
      setIsAuth(true);
      router.push('/dashboard');
    }
    setLoading(false);
  }, [setIsAuth, router]);

  if (loading) return <>Загрузка...</>;
  if (!isAuth) return null;

  return <>{children}</>;
};

export default PrivateRoute;
