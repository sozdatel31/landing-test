import React from "react";
import closedEye from "../../assets/closed-eye.png";
import openedEye from "../../assets/opened-eye.png";
import styles from "./Form.module.scss";

interface PasswordFieldProps {
  value: string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Password({ value, error, onChange }: PasswordFieldProps){
  const [passwordFieldType, setPasswordFieldType] = React.useState("password");

  const handlePasswordClick = () => {
    setPasswordFieldType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
      <div className={`${styles.form__input_item} ${error ? styles.form__input_item_error : ""}`}>
        <label htmlFor="pass">Пароль</label>
        <div className={styles.form__password_field}>
          <input
              type={passwordFieldType}
              id="pass"
              value={value}
              placeholder="Придумайте пароль"
              name="password"
              onChange={onChange}
          />
          <button type="button" onClick={handlePasswordClick}>
            {passwordFieldType === "password" ? (
                <img src={closedEye} alt="Показать пароль" />
            ) : (
                <img src={openedEye} alt="Скрыть пароль" />
            )}
          </button>
        </div>
        {!!error && <p className={styles.form__error_message}>{error}</p>}
      </div>
  );
};
