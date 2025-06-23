"use client";

import React from "react";
import styles from "./NewPostForm.module.scss";

const NewPostForm = () => {

    
  return (
    <form className={styles.postForm}>
      <textarea className={styles.area} placeholder="Написать..." />
      <div className={styles.actions}>
        <button>Загрузить изображение</button>
        <button type="submit">Отправить</button>
      </div>
    </form>
  );
};

export default NewPostForm;
