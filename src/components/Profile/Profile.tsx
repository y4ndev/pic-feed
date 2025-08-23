import useAuthStore from '@/store/AuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '../header/Header';
import styles from './Profile.module.scss';

const Profile = () => {
  const { username, setUsername } = useAuthStore();
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
    <>
      <Header />
      <div className={styles.profile}>
        <h2>Добро пожаловать {username}</h2>
        <div className={styles.profileSetting}>
          <form action=''>
            <span> Имя пользователя:</span>
            <div className={styles.profileName}>
              <input type='text' placeholder={username} />{' '}
              <a className={styles.btn}>Сменить</a>
            </div>
          </form>
        </div>
        <button className='btn' onClick={handleLogout}>
          Выход
        </button>
      </div>
    </>
  );
};

export default Profile;
