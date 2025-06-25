"use client";

import React, { useState } from "react";
import styles from "./NewPostForm.module.scss";
import { addPost } from "@/lib/dbPosts";

const NewPostForm = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // для показа ошибки

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const postData = image ? { text, image } : { text };
      await addPost(postData);

      setText("");
      setImage(null);
    } catch (err: any) {
      console.error("Ошибка при отправке поста:", err);
      setError(err.message || "Неизвестная ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.postForm} onSubmit={handleSubmit}>
      <textarea
        className={styles.area}
        placeholder="Написать..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className={styles.actions}>
        <button type="button" onClick={() => alert("Загрузка изображений пока не реализована")}>
          Загрузить изображение
        </button>
        <button type="submit" disabled={loading}>
          {loading ? "Отправка..." : "Отправить"}
        </button>
      </div>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </form>
  );
};

export default NewPostForm;
