import styles from './AuthForm.module.scss';

interface LoginFormProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleToggle: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  handleToggle,
}) => {
  return (
    <>
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
        Войти
      </button>
      <p>
        Нет аккаунта?{' '}
        <span onClick={handleToggle} className={styles.link}>
          <a href='#'>Зарегистрироваться</a>
        </span>
      </p>
    </>
  );
};

export default LoginForm;
