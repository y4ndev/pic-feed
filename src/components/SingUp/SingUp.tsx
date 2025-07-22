'use client';
import { loginUser, registerUser } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(true); // true - регистрация, false - вход
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !password || (isSignUp && !username)) {
      setError('Все поля обязательны');
      return;
    }

    if (password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    try {
      if (isSignUp) {
        const data = await registerUser(username, email, password);
        localStorage.setItem('token', data.jwt);
        setSuccess('Регистрация прошла успешно!');
      } else {
        const data = await loginUser(email, password);
        localStorage.setItem('token', data.jwt);
        // Здесь можно сделать редирект или обновить состояние
        router.push('/dashboard');
        setSuccess('Вход выполнен успешно!');
      }
      setError(null);
    } catch (err: any) {
      setError(
        err.response?.data?.error?.message ||
          err.response?.data?.message ||
          'Ошибка авторизации'
      );
    }
  };

  return (
    <div>
      <h2>{isSignUp ? 'Регистрация' : 'Вход'}</h2>
      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder='Имя'
          />
        )}
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='Email'
        />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type='password'
          placeholder='Пароль'
        />
        <button type='submit'>
          {isSignUp ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <button
        onClick={() => {
          setIsSignUp(!isSignUp);
          setError(null);
          setSuccess(null);
          setUsername('');
          setEmail('');
          setPassword('');
        }}
      >
        {isSignUp
          ? 'Уже есть аккаунт? Войти'
          : 'Нет аккаунта? Зарегистрироваться'}
      </button>
    </div>
  );
};

export default AuthForm;
