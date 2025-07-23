'use client';
import { loginUser, registerUser } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './AuthForm.module.scss';

const AuthForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(true);

  const router = useRouter();
  const isRegister = !isLogin;

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
    setIsLogin(prev => !prev);
    resetForm();
  };

  const validate = () => {
    if (!email || !password || (isRegister && !username)) {
      setError('Все поля обязательны');
      return false;
    }
    if (password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    if (!validate()) return;

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
            id='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='Email'
          />
        </div>

        <div className={styles.authInner}>
          <label htmlFor='password'>Password</label>
          <input
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
