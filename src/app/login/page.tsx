"use client"; // Это нужно для корректной работы в Next.js с клиентским кодом

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Для навигации в Next.js
import { auth } from "@/lib/firebase"; // Импортируем объект auth из настроек Firebase
import {
  createUserWithEmailAndPassword, // Для регистрации пользователя по email и паролю
  signInWithEmailAndPassword, // Для входа пользователя по email и паролю
  onAuthStateChanged, // Слушатель изменений состояния авторизации
} from "firebase/auth";

export default function LoginPage() {
  // Состояния компонента
  const [mode, setMode] = useState<"register" | "login" | null>(null); // Выбираем, регистрация или вход
  const [email, setEmail] = useState(""); // Для хранения введенного email
  const [password, setPassword] = useState(""); // Для хранения введенного пароля
  const [error, setError] = useState<string | null>(null); // Для отображения ошибок
  const [loading, setLoading] = useState(true); // Для отслеживания состояния загрузки (пока проверяется авторизация)
  const router = useRouter(); // Хук для навигации в Next.js

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
  }, [router]);

  // Если идет загрузка, показываем сообщение "Загрузка..."
  if (loading) {
    return <p>Загрузка...</p>; // Пока не получим ответ от Firebase, показываем "Загрузка..."
  }

  // Функция для обработки отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Отменяем стандартное поведение формы (перезагрузку страницы)
    setError(null); // Сбрасываем ошибку перед каждой новой попыткой

    try {
      if (mode === "register") {
        // Если выбран режим "регистрация", то создаем нового пользователя
        await createUserWithEmailAndPassword(auth, email, password);
      } else if (mode === "login") {
        // Если выбран режим "вход", то пытаемся войти в аккаунт с указанными email и паролем
        await signInWithEmailAndPassword(auth, email, password);
      }
      // После успешного входа или регистрации, переходим на страницу личного кабинета
      router.push("/dashboard");
    } catch (err: any) {
      // Обработка ошибок в процессе регистрации или входа
      if (err.code === "auth/email-already-in-use") {
        setError("Этот email уже зарегистрирован."); // Если email уже занят
      } else if (err.code === "auth/invalid-email") {
        setError("Неверный формат email."); // Если email в неправильном формате
      } else if (err.code === "auth/weak-password") {
        setError("Пароль слишком слабый. Минимум 6 символов."); // Если пароль слишком короткий
      } else if (err.code === "auth/user-not-found") {
        setError("Пользователь с таким email не найден."); // Если пользователь не найден
      } else if (err.code === "auth/wrong-password") {
        setError("Неверный пароль."); // Если неверный пароль
      } else {
        setError("Неизвестная ошибка. Попробуйте позже."); // Для остальных ошибок
      }
    }
  };

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
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Форма для ввода email и пароля */}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Обновляем email
              style={{ width: "100%", marginBottom: 10 }}
            />
            <input
              type="password"
              placeholder="Пароль"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Обновляем пароль
              style={{ width: "100%", marginBottom: 10 }}
            />
            {/* Кнопка для отправки формы */}
            <button type="submit" style={{ width: "100%" }}>
              {mode === "register" ? "Зарегистрироваться" : "Войти"}
            </button>
          </form>

          {/* Кнопка для возврата на выбор "Зарегистрироваться" или "Войти" */}
          <button
            onClick={() => {
              setMode(null); // Сбрасываем режим
              setError(null); // Сбрасываем ошибки
              setEmail(""); // Очищаем email
              setPassword(""); // Очищаем пароль
            }}
            style={{ marginTop: 10 }}
          >
            ← Назад
          </button>
        </>
      )}
    </div>
  );
}
