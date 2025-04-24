import React, { ChangeEvent, createContext, useContext, useState, ReactNode } from 'react';
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

interface FormContextType {
  values: FormValues;
  errors: Record<keyof FormValues, string>;
  handleInput: (
    name: keyof FormValues
  ) => (e: ChangeEvent<HTMLInputElement> | string | undefined) => void;
  handleCheckbox: (name: keyof FormValues) => (e: ChangeEvent<HTMLInputElement>) => void;
  resetForm: () => void;
  setErrors: React.Dispatch<React.SetStateAction<Record<keyof FormValues, string>>>;
}

const INIT_VALUES: FormValues = {
  phone: '',
  password: '',
  privacyPolicy: false,
  agree: false,
};

const INIT_ERRORS: Record<keyof FormValues, string> = {
  phone: '',
  password: '',
  privacyPolicy: '',
  agree: '',
};

const FormContext = createContext<FormContextType | undefined>(undefined);

const MIN_PASSWORD_LENGTH = 6;

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error('useFormContext must be used within FormProvider');
  return context;
};

const FormProvider = ({ children }: { children: ReactNode }) => {
  const [values, setValues] = useState(INIT_VALUES);
  const [errors, setErrors] = useState(INIT_ERRORS);

  const handleInput =
    (name: keyof FormValues) => (e: ChangeEvent<HTMLInputElement> | string | undefined) => {
      if (name === 'phone') {
        setValues((prev) => ({
          ...prev,
          [name]: e as string,
        }));
      } else {
        setValues((prev) => ({
          ...prev,
          [name]: typeof e === 'object' ? e.target.value : (e ?? ''),
        }));
      }
    };

  const handleCheckbox = (name: keyof FormValues) => (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [name]: e.target.checked }));
  };

  const resetForm = () => {
    setValues(INIT_VALUES);
    setErrors(INIT_ERRORS);
  };

  return (
    <FormContext.Provider
      value={{ values, errors, handleInput, handleCheckbox, resetForm, setErrors }}
    >
      {children}
    </FormContext.Provider>
  );
};

const Form = () => {
  const { values, errors, handleInput, handleCheckbox, setErrors, resetForm } = useFormContext();

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
      resetForm();
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

export default () => (
  <FormProvider>
    <Form />
  </FormProvider>
);
