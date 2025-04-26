"use client"; // Это нужно для корректной работы в Next.js с клиентским кодом

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Для навигации в Next.js
import { auth } from "@/lib/firebase"; // Импортируем объект auth из настроек Firebase
import {
  onAuthStateChanged, // Слушатель изменений состояния авторизации
} from "firebase/auth";
import { useAuthStore } from "@/store/AuthStore";
import AuthForm from "@/components/AuthForm/AuthForm";
import FormError from "@/components/FormError/FormError";

export default function LoginPage() {
  const { mode, error, loading, setMode, setPassword, setError, setLoading, setEmail } =
    useAuthStore((state) => state);

  const router = useRouter();

  // useEffect запускается при монтировании компонента
  useEffect(() => {
    // Слушаем изменения состояния авторизации (пользователь авторизован или нет)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Если пользователь авторизован, отправляем его на страницу личного кабинета
        router.push("/dashboard"); // Редирект на страницу dashboard
      } else {
        // Если пользователь не авторизован, ставим loading в false (это позволит отобразить форму входа или регистрации)
        setLoading(false);
      }
    });

    // Возвращаем функцию очистки (аннулируем слушателя, когда компонент размонтируется)
    return () => unsubscribe();
  }, [router, setLoading]);

  // Если идет загрузка, показываем сообщение "Загрузка..."
  if (loading) {
    return <p>Загрузка...</p>; // Пока не получим ответ от Firebase, показываем "Загрузка..."
  }

  const handleFormClear = () => {
    setMode(null); // Сбрасываем режим
    setError(null); // Сбрасываем ошибки
    setEmail(""); // Очищаем email
    setPassword(""); // Очищаем пароль
  };

  // Функция для обработки отправки формы

  // Основная разметка компонента
  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      {/* Если режим не выбран, показываем кнопки для выбора действия */}
      {!mode && (
        <>
          <h2>Добро пожаловать</h2>
          <p>Выберите действие:</p>
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button onClick={() => setMode("register")}>Зарегистрироваться</button>
            <button onClick={() => setMode("login")}>Войти</button>
          </div>
        </>
      )}

      {/* Если режим выбран, показываем форму регистрации или входа */}
      {mode && (
        <>
          <h2>{mode === "register" ? "Регистрация" : "Вход"}</h2>
          {/* Если есть ошибка, показываем сообщение об ошибке */}
          <FormError message={error} />

          {/* Форма для ввода email и пароля */}
          <AuthForm />

          {/* Кнопка для возврата на выбор "Зарегистрироваться" или "Войти" */}
          <button onClick={handleFormClear} style={{ marginTop: 10 }}>
            ← Назад
          </button>
        </>
      )}
    </div>
  );
}
