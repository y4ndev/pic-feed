'use client';
import useAuthStore from '@/store/AuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './AuthForm.module.scss';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthForm = () => {
  const {  isLogin,} = useAuthStore();

  //--actions
  const {
    setIsAuth,
    setIsLogin,
    resetUI,
  } = useAuthStore();

  const router = useRouter();
  const isRegister = !isLogin;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuth(true);
      router.push('/dashboard');
    }
  }, [router, setIsAuth]);

  const resetForm = () => {
    resetUI();
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <div className={styles.inner}>
      {isLogin ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};

export default AuthForm;
