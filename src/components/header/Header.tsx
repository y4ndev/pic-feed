import styles from './Header.module.scss';

interface HeaderProps {
  showAvatar?: boolean;
  showProfile?: boolean;
  showTitle?: boolean;
  showPage?: boolean;
  showLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  showAvatar,
  showProfile,
  showTitle,
  showLogout,
  showPage,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.back}>
          <a>На главнаую</a>
        </div>
        <span className={styles.title}>Pic-feed</span>
      </div>
      <div className={styles.middle}>
        <h2>Личный кабинет</h2>
      </div>
      <div className={styles.right}>
        <div className={styles.theme}>Тёма</div>
        <a className={styles.logout}>Выйти</a>
        <div className={styles.profile}>Профиль</div>
      </div>
    </header>
  );
};

export default Header;
