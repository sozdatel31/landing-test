import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import styles from './Form.module.scss';

interface PhoneFieldProps {
  value: string | undefined;
  error: string;
  onChange: (value: string | undefined) => void;
}

export function Phone({ value, error, onChange }: PhoneFieldProps) {
  return (
    <div className={`${styles.form__input_item} ${error ? styles.form__input_item_error : ''}`}>
      <label htmlFor="phone">Номер телефона</label>
      <PhoneInput
        international
        defaultCountry="BY"
        placeholder="+375"
        value={value}
        onChange={onChange}
        className={styles.phoneInput}
      />
      {!!error && <p className={styles.form__error_message}>{error}</p>}
    </div>
  );
}
