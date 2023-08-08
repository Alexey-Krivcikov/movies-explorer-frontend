import { useState, useCallback } from "react";
import { ERROR_MESSAGES, NAME_REGEX, EMAIL_REGEX, PASSWORD_REGEX, SEARCH_REGEX } from "../utils/config/constants";

//хук управления формой и валидации формы
export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    let error = '';

    if (name === 'name') {
      if (!NAME_REGEX.test(value)) {
        error = ERROR_MESSAGES.name;
      }
    }
    if (name === 'email') {
      if (!EMAIL_REGEX.test(value)) {
        error = ERROR_MESSAGES.email;
      }
    }
    if (name === 'password') {
      if (!PASSWORD_REGEX.test(value)) {
        error = ERROR_MESSAGES.password;
      }
    }
    if (name === 'search') {
      if (!SEARCH_REGEX.test(value)) {
        error = ERROR_MESSAGES.search;
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
