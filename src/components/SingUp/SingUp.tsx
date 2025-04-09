"use client"; // для корректной работы в Next.js App Router

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState<boolean>(true);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Регистрация успешна!");
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("Этот email уже зарегистрирован.");
      } else if (err.code === "auth/invalid-email") {
        setError("Неверный формат email.");
      } else if (err.code === "auth/weak-password") {
        setError("Пароль слишком слабый. Минимальная длина пароля — 6 символов.");
      } else {
        setError("Произошла неизвестная ошибка.");
      }
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Вход успешен!");
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        setError("Пользователь с таким email не найден.");
      } else if (err.code === "auth/wrong-password") {
        setError("Неверный пароль.");
      } else {
        setError("Произошла ошибка при входе.");
      }
    }
  };

  return (
    <div>
      {/* Кнопки для переключения между регистрацией и входом */}
      <div>
        <button onClick={() => setIsSignUp(true)}>Зарегистрироваться</button>
        <button onClick={() => setIsSignUp(false)}>Войти</button>
      </div>

      {/* Форма для регистрации */}
      {isSignUp === true && (
        <div>
          <h2>Регистрация</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSignUp}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Зарегистрироваться</button>
          </form>
        </div>
      )}

      {/* Форма для входа */}
      {isSignUp === false && (
        <div>
          <h2>Вход</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSignIn}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Войти</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignUp;
