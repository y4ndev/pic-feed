'use client';
import useAuthStore from '@/store/AuthStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './AuthForm.module.scss';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    username,
    loading,
    isLogin,
    setIsAuth,
    setIsLogin,
    error,
    success,
    login,
    register,
    setUsername,
    setError,
    setLoading,
    setSuccess,
  } = useAuthStore();

  const formProps = { email, password, setEmail, setPassword };

  const router = useRouter();
  const isRegister = !isLogin;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuth(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    }
  }, [router, setIsAuth]);

  const resetMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    resetMessages();
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    setLoading(true);

    try {
      if (isRegister) {
        await register(username, email, password);
        setSuccess('Регистрация прошла успешно!');
      } else {
        await login(email, password);
        setSuccess('Вход выполнен успешно!');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      }
    } catch (err: any) {
      const message =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        'Ошибка авторизации';
      setError(message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <div className={styles.inner}>
      <h2>{isRegister ? 'Регистрация' : 'Вход'}</h2>
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          {isRegister ? (
            <RegisterForm
              {...formProps}
              username={username}
              setUsername={setUsername}
              handleToggle={handleToggle}
            />
          ) : (
            <LoginForm {...formProps} handleToggle={handleToggle} />
          )}
        </form>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default AuthForm;
