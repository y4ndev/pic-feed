"use client"; // Это нужно для корректной работы в Next.js с клиентским кодом

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Для навигации в Next.js
import { onAuthStateChanged } from "firebase/auth"; // Для отслеживания состояния авторизации в Firebase
import { auth } from "@/lib/firebase"; // Импортируем объект auth, который настроен для Firebase

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter(); // Хук для навигации в Next.js
  const [checking, setChecking] = useState(true); // Состояние для отслеживания того, идёт ли проверка авторизации
  const [authenticated, setAuthenticated] = useState(false); // Состояние для проверки, авторизован ли пользователь

  useEffect(() => {
    // Используем onAuthStateChanged, чтобы следить за состоянием пользователя в Firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Если пользователь авторизован, устанавливаем состояние authenticated в true
        setAuthenticated(true);
      } else {
        // Если пользователь не авторизован, перенаправляем на страницу входа (login)
        router.push("/login");
      }
      // Устанавливаем checking в false, так как проверка завершена
      setChecking(false);
    });

    // Возвращаем функцию для очистки слушателя, когда компонент размонтируется
    return () => unsubscribe();
  }, [router]); // Хук будет выполняться при изменении router

  // Пока происходит проверка авторизации, показываем сообщение
  if (checking) {
    return <p>Проверка авторизации...</p>;
  }

  // Если пользователь авторизован, рендерим дочерние компоненты (children)
  // Если нет — ничего не показываем (null)
  return authenticated ? <>{children}</> : null;
};

export default PrivateRoute;
