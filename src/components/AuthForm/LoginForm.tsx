import useAuthStore from '@/store/AuthStore';
import { useForm } from 'react-hook-form';
import styles from './AuthForm.module.scss';

interface LoginFormProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login, loading, success, toggleMode } = useAuthStore();

  const onSubmit = (data: any) => {
    login(data.email, data.password);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.authInner}>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            {...register('email', { required: true })}
            placeholder='Email'
          />
        </div>

        <div className={styles.authInner}>
          <label htmlFor='password'>Password</label>
          <input
            minLength={4}
            id='password'
            type='password'
            placeholder='Пароль'
            {...register('password', { required: true })}
          />
        </div>

        <button className='btn' type='submit'>
          Войти
        </button>
        <p>
          Нет аккаунта?{' '}
          <span onClick={toggleMode} className={styles.link}>
            <a href='#'>Зарегистрироваться</a>
          </span>
        </p>
      </form>
    </>
  );
};

export default LoginForm;
