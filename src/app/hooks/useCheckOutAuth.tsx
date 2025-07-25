import useAuthStore from '@/store/AuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useCheckOutAuth = () => {
  const router = useRouter();
  const { setIsAuth, token } = useAuthStore();

  useEffect(() => {
    if (token) {
      setIsAuth(true);
      router.push('/dashboard');
    }
  }, [router, setIsAuth, token]);
};
