import React from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"; //Для регистрации пользователя по email и паролю и для входа пользователя по email и паролю
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/AuthStore";

const AuthForm = () => {
  const { mode, email, password, setError, setEmail, setPassword } = useAuthStore((state) => state);
  const router = useRouter();

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
  return (
    <>
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
    </>
  );
};

export default AuthForm;
