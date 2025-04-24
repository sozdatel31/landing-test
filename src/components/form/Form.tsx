import React, { ChangeEvent } from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { Phone } from './Phone';
import { Password } from './Password';
import styles from './Form.module.scss';
import gold2 from '../../assets/gold-2.png';
interface FormValues {
  phone: string | undefined;
  password: string;
  privacyPolicy: boolean;
  agree: boolean;
}
const INIT_VALUES = {
  phone: '',
  password: '',
  privacyPolicy: false,
  agree: false,
};
const INIT_ERRORS = {
  phone: '',
  password: '',
  privacyPolicy: '',
  agree: '',
};
const MIN_PASSWORD_LENGTH = 6;

const Form = () => {
  const [values, setValues] = React.useState(INIT_VALUES);
  const [errors, setErrors] = React.useState(INIT_ERRORS);

  const handleInput =
    (name: keyof FormValues) => (e: ChangeEvent<HTMLInputElement> | string | undefined) => {
      if (name === 'phone') {
        // Если поле - это телефон, приводим значение к string (или оставляем undefined)
        setValues((prev) => ({
          ...prev,
          [name]: e as string,
        }));
      } else {
        // Для остальных полей (например, password) получаем значение как string
        setValues((prev) => ({
          ...prev,
          [name]: e && typeof e === 'object' ? e.target.value : e,
        }));
      }
    };

  const handleCheckbox = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [name]: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { phone: '', password: '', privacyPolicy: '', agree: '' };
    const { phone, password, privacyPolicy, agree } = values;

    if (!phone) {
      newErrors.phone = 'Обязательно к заполнению';
    } else if (!isValidPhoneNumber(phone)) {
      newErrors.phone = 'Введите корректный номер телефона';
    }
    if (!password) {
      newErrors.password = 'Обязательно к заполнению';
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }
    if (!privacyPolicy) {
      newErrors.privacyPolicy = 'Обязательно к заполнению';
    }
    if (!agree) {
      newErrors.agree = 'Обязательно к заполнению';
    }

    if (Object.values(newErrors).some((error) => !!error)) {
      setErrors(newErrors);
    } else {
      setValues(INIT_VALUES);
      setErrors(INIT_ERRORS);
      alert('Спасибо');
    }
  };

  return (
    <form className={styles.form__container} onSubmit={handleSubmit}>
      <img className={styles.gold2} src={gold2} alt={'gold2'} />

      <div className={styles.form__main}>
        <p className={styles.form__title}>Регистрация</p>
        <div className={styles.form__input_list}>
          <Phone value={values.phone} onChange={handleInput('phone')} error={errors.phone} />
          <Password
            value={values.password}
            onChange={handleInput('password')}
            error={errors.password}
          />
        </div>
        <div className={styles.form__checkbox_list}>
          <div className={styles.form__checkbox_item}>
            <input
              type="checkbox"
              id="check1"
              checked={values.privacyPolicy}
              name="privacyPolicy"
              onChange={handleCheckbox('privacyPolicy')}
            />
            <label htmlFor="check1">
              <p>Мне больше 21 года.</p>
              <p>
                Я согласен и принимаю{' '}
                <a target={'_blank'} href="https://google.com">
                  "Правила приема ставок"
                </a>{' '}
                и{' '}
                <a target={'_blank'} href="https://google.com">
                  "Политику конфиденциальности"
                </a>
              </p>
            </label>
            {!!errors.privacyPolicy && (
              <p className={styles.form__error_message}>{errors.privacyPolicy}</p>
            )}
          </div>
          <div className={styles.form__checkbox_item}>
            <input
              type="checkbox"
              id="check2"
              checked={values.agree}
              name="agree"
              onChange={handleCheckbox('agree')}
            />
            <label htmlFor="check2">
              <p>
                Я принимаю участие и согласен с <a href="/link">условиями бонуса</a>
              </p>
            </label>
            {!!errors.agree && <p className={styles.form__error_message}>{errors.agree}</p>}
          </div>
        </div>
        <button type="submit" className={styles.form__button}>
          Регистрация
        </button>
      </div>
    </form>
  );
};

export default Form;
