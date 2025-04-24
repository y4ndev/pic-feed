"use client";
// Указывает, что компонент работает на клиенте (не на сервере), обязательно для использования хуков, событий и т.п. в Next.js 13+

import { useEffect, useState } from "react"; // Импортируем хуки React
import { useRouter } from "next/navigation"; // Хук для навигации (перенаправления) в Next.js
import { signOut, onAuthStateChanged } from "firebase/auth"; // Импорт из Firebase: выход из аккаунта и слежение за авторизацией
import { auth } from "@/lib/firebase"; // Импорт объекта авторизации, настроенного в отдельном файле
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
// Оборачиваем страницу в этот компонент, чтобы на неё могли зайти только авторизованные пользователи

const Dashboard = () => {
  const router = useRouter(); // Хук, с помощью которого можно перенаправлять пользователя на другие страницы
  const [userEmail, setUserEmail] = useState<string | null>(null);
  // Сохраняем email авторизованного пользователя (для отображения на экране)

  useEffect(() => {
    // useEffect сработает один раз при монтировании компонента
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Подписываемся на изменение состояния авторизации в Firebase
      if (user) {
        // Если пользователь авторизован
        setUserEmail(user.email); // Сохраняем его email в состояние
      }
    });

    return () => unsubscribe();
    // Очищаем подписку при размонтировании компонента, чтобы не было утечек памяти
  }, []);

  const handleLogout = async () => {
    // Функция выхода пользователя
    await signOut(auth); // Выход из аккаунта Firebase
    router.push("/login"); // Перенаправляем на страницу входа
  };

  const handelFeed = () => {
    router.push("../feed");
  };

  return (
    <PrivateRoute>
      {/* Защищённый маршрут. Покажет содержимое только если пользователь авторизован */}
      <div style={{ padding: 20 }}>
        <h1>👋 Добро пожаловать в личный кабинет</h1>

        {/* Если email пользователя есть, показываем его */}
        {userEmail && (
          <p>
            Вы вошли как: <strong>{userEmail}</strong>
          </p>
        )}

        {/* Кнопка выхода */}
        <button
          onClick={handleLogout} // Обработка выхода
          style={{
            marginTop: 20,
            backgroundColor: "#f33", // Красный цвет кнопки
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Выйти
        </button>
        <button onClick={handelFeed}>Лента</button>
      </div>
    </PrivateRoute>
  );
};

export default Dashboard; // Экспорт компонента для использования в других местах
