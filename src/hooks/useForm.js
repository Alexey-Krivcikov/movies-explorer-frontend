import { useState, useCallback } from "react";

//хук управления формой и валидации формы
export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;;
    let error = '';

    if (name === 'name') {
      const nameRegex = /^[A-Za-zА-Яа-я\s-]+$/;
      if (!nameRegex.test(value)) {
        error = 'Имя должно содержать только латиницу, кириллицу, пробел или дефис.';
      }
    }
    if (name === 'email') {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailRegex.test(value)) {
        error = 'Введите корректный email.';
      }
    }
    if (name === 'password') {
      const passwordRegex = /.+/;
      if (!passwordRegex.test(value)) {
        error = 'Пароль обязателен.';
      }
    }
    if (name === 'search') {
      const passwordRegex = /.+/;
      if (!passwordRegex.test(value)) {
        error = 'Нужно ввести ключевое слово.';
      }
    }
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: error });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}
