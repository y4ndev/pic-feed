import styles from './AuthForm.module.scss';

interface RegisterFormProps {
  username: string;
  email: string;
  password: string;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleToggle: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  username,
  email,
  password,
  setUsername,
  setEmail,
  setPassword,
  handleToggle,
}) => {
  return (
    <>
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
        Зарегистрироваться
      </button>

      <p>
        Уже есть аккаунт?{' '}
        <span onClick={handleToggle} className={styles.link}>
          <a href='#'>Войти</a>
        </span>
      </p>
    </>
  );
};

export default RegisterForm;
