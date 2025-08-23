import styles from './Header.module.scss';

interface HeaderProps {
  showAvatar?: boolean;
  showProfile?: boolean;
  showTitle?: boolean;
  showLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  showAvatar,
  showProfile,
  showTitle,
  showLogout,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.back}>
          <button>На главнаую</button>
        </div>
        <span className={styles.title}>Pic-feed</span>
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
