import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import darkIcon from '../../assets/img/dark.png';
import lightIcon from '../../assets/img/light.png';
import styles from './Header.module.scss';

interface HeaderProps {
  title?: string;
  showProfile?: boolean;
  showBack?: boolean;
  showLogout?: boolean;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showProfile,
  showLogout,
  showBack,
  onLogout,
}) => {
  const [theme, setTheme] = useState<boolean>(false);

  const toggleTheme = () => {
    setTheme(theme => !theme);
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {showBack && (
          <div className={styles.back}>
            <Link href='/feed'>На главнаую</Link>
          </div>
        )}

        {/* <span className={styles.title}>Pic-feed</span> */}
      </div>
      <div className={styles.middle}>{title && <h2>{title}</h2>}</div>
      <div className={styles.right}>
        <a className={styles.theme} onClick={toggleTheme}>
          {theme ? (
            <Image alt='light' src={lightIcon} width={35} height={35}></Image>
          ) : (
            <Image alt='dark' src={darkIcon} width={35} height={35}></Image>
          )}
        </a>
        {showLogout && (
          <a className={styles.logout} onClick={onLogout}>
            Выйти
          </a>
        )}
        {showProfile && (
          <Link href={'/dashboard'} className={styles.profile}>
            Профиль
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
