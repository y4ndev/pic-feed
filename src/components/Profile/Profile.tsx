import useAuthStore from '@/store/AuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '../header/Header';
import styles from './Profile.module.scss';

const Profile = () => {
  const { username, setUsername, email } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem('username');
    setUsername(username ?? '');
  }, [setUsername]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.profile}>
        <div className={styles.content}>
          <form action=''>
            <div className={styles.avatar}>
              <span>Аватар</span>
              <span className={styles.picture}></span>
              <a href=''>Изменить фото</a>
            </div>

            <div className={styles.name}>
              <input type='text' placeholder={username} />{' '}
              <a className={styles.btn}>Сменить</a>
            </div>
            <div className={styles.email}>
              <span>Email:</span>
              <span>{email}</span>
            </div>

            <div className={styles.password}>
              <div className={styles.passwordInner}>
                <span>Пароль:</span>
                <span>******</span>
              </div>
              <a href=''>Изменить</a>
            </div>

            <button className='btn' onClick={handleLogout}>
              Выход
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
