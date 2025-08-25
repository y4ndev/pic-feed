import useAuthStore from '@/store/AuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '../header/Header';
import styles from './Profile.module.scss';

const Profile = () => {
  const { username, setUsername, email, setEmail } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    setEmail(email ?? '');
    setUsername(username ?? '');
  }, [setUsername, setEmail]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className={styles.wrapper}>
      <Header
        showBack
        showLogout
        onLogout={handleLogout}
        title={'Личный кабинет'}
      />
      <div className={styles.profile}>
        <div className={styles.content}>
          <form className={styles.form} action=''>
            <div className={styles.avatar}>
              <span className={styles.title}>Аватар</span>
              <span className={styles.picture}></span>
              <a href=''>Изменить фото</a>
            </div>

            <div className={styles.name}>
              <input type='text' placeholder={username} />{' '}
              <a className={styles.btn}>Сменить</a>
            </div>
            <div className={styles.email}>
              <span>Email:</span>
              <span className={styles.small}>
                {'  '}
                {email}
              </span>
            </div>

            <div className={styles.password}>
              <div className={styles.passwordInner}>
                <span>Пароль:</span>
                <span className={styles.small}>******</span>
              </div>
              <a href=''>Изменить</a>
            </div>
            <div className={styles.logout}>
              <a href=''></a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
