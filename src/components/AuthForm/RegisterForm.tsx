import useAuthStore from '@/store/AuthStore';
import { useForm } from 'react-hook-form';
import styles from './AuthForm.module.scss';

interface RegisterFormProps {
  username: string;
  email: string;
  password: string;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;

}

const RegisterForm: React.FC = () => {
  const { register: formRegister, handleSubmit } = useForm();
  const { register: registerUser, loading, error, success, toggleMode } = useAuthStore();

  const onSubmit = (data: any) => {
    registerUser(data.email, data.username, data.password);
  };
  return (
    <>
      <div className={styles.authInner}>
        <label htmlFor='username'>Username</label>
        <input
          id='username'
          {...formRegister('username', { required: true })}
          placeholder='Имя'
        />
      </div>

      <div className={styles.authInner}>
        <label htmlFor='email'>Email</label>
        <input
          required
          id='email'
          {...formRegister('email', { required: true })}
          placeholder='Email'
        />
      </div>

      <div className={styles.authInner}>
        <label htmlFor='password'>Password</label>
        <input
          minLength={4}
          id='password'
          type='password'
          {...formRegister('password', { required: true })}
          placeholder='Пароль'
        />
      </div>

      <button className='btn' type='submit'>
        Зарегистрироваться
      </button>

      <p>
        Уже есть аккаунт?{' '}
        <span onClick={toggleMode} className={styles.link}>
          <a href='#'>Войти</a>
        </span>
      </p>
    </>
  );
};

export default RegisterForm;
