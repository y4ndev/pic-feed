import React from "react";
import styles from "./FormError.module.scss";
interface IFormError {
  message: null | string;
}

const FormError: React.FC<IFormError> = ({ message }) => {
  if (!message) return null;

  return (
    <>
      <span className={styles.error}>{message}</span>
    </>
  );
};

export default FormError;
