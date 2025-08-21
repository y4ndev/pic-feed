'use client';
import useAuthStore from '@/store/AuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './AuthForm.module.scss';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthForm = () => {
  const { email, password, username, loading, isLogin, error, success } =
    useAuthStore();

  //--actions
  const {
    setEmail,
    setPassword,
    setIsAuth,
    setIsLogin,
    setUsername,
    resetUI,
    login,
    register,
  } = useAuthStore();

  const formProps = { email, password, setEmail, setPassword };

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
    setUsername('');
    setEmail('');
    setPassword('');
    resetUI();
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetUI();

    try {
      if (isRegister) {
        await register(username, email, password);
      } else {
        await login(email, password);

        router.push('/dashboard');
      }
    } catch (err: any) {}
  };

  return (
    <div className={styles.inner}>
      {!loading && <h2>{isRegister ? 'Регистрация' : 'Вход'}</h2>}
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
