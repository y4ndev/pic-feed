'use client';
import styles from './loginPage.module.scss';

import AuthForm from '@/components/AuthForm/AuthForm';

export default function LoginPage() {
  return (
    <div className={styles.login}>
      <AuthForm />
    </div>
  );
}
