'use client';
import { loginUser, registerUser } from '@/lib/api';
import useAuthStore from '@/store/AuthStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './AuthForm.module.scss';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    username,
    isLogin,
    isAuth,
    setIsAuth,
    setIsLogin,
    error,
    success,
    login,
    register,
    toggleMode,
    setUsername,
    setError,
    setSuccess,
  } = useAuthStore();

  const router = useRouter();
  const isRegister = !isLogin;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuth(true);
      router.push('/dashboard');
    }
  }, [router]);

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
    setIsLogin(!login);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    try {
      if (isRegister) {
        const data = await registerUser(username, email, password);
        localStorage.setItem('token', data.jwt);
        setSuccess('Регистрация прошла успешно!');
      } else {
        const data = await loginUser(email, password);
        localStorage.setItem('token', data.jwt);
        setSuccess('Вход выполнен успешно!');
        router.push('/dashboard');
      }
    } catch (err: any) {
      const message =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        'Ошибка авторизации';
      setError(message);
    }
  };

  return (
    <div className={styles.inner}>
      <h2>{isRegister ? 'Регистрация' : 'Вход'}</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        {isRegister && (
          <div className={styles.authInner}>
            <label htmlFor='username'>Username</label>
            <input
              required
              id='username'
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder='Имя'
            />
          </div>
        )}

        <div className={styles.authInner}>
          <label htmlFor='email'>Email</label>
          <input
            required
            id='email'
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='Email'
          />
        </div>

        <div className={styles.authInner}>
          <label htmlFor='password'>Password</label>
          <input
            required
            minLength={4}
            id='password'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='Пароль'
          />
        </div>

        <button className='btn' type='submit'>
          {isRegister ? 'Зарегистрироваться' : 'Войти'}
        </button>

        <div className={styles.switch}>
          {isLogin ? (
            <p>
              Нет аккаунта?{' '}
              <span onClick={handleToggle} className={styles.link}>
                <a href='#'>Зарегистрироваться</a>
              </span>
            </p>
          ) : (
            <p>
              Уже есть аккаунт?{' '}
              <span onClick={handleToggle} className={styles.link}>
                <a href='#'>Войти</a>
              </span>
            </p>
          )}
        </div>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default AuthForm;
