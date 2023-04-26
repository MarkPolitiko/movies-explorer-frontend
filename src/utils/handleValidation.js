import { useCallback, useState } from "react";

export default function useValidation() {

  const[isValid, setIsValid] = useState(false);
  const[errors, setErrors] = useState({});
  const[values, setValues] = useState({});

  const handleChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    setIsValid(target.closest("form").checkValidity());
    setErrors({ ...errors, [name]: target.validationMessage });
    setValues({ ...values, [name]: value });

  }

  const resetForm = useCallback(
    (newIsValid = false, newErrors = {}, newValues = {}) => {
      setIsValid(newIsValid);
      setErrors(newErrors);
      setValues(newValues);
    },
    [setIsValid, setErrors, setValues]
  );

  return { handleChange, resetForm, setIsValid, isValid, errors, values, setValues };
}
