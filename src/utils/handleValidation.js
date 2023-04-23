import { useCallback, useState } from "react";

export default function useValidation() {

  const[isValid, setIsValid] = useState(false);
  const[errors, setErrors] = useState({});
  const[values, setValues] = useState({});
  // const [isValidInput, setIsValidInput] = useState({});

  const handleChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    setIsValid(target.closest("form").checkValidity());
    // setIsValidInput({ ...isValidInput, [name]: target.checkValidity() });
    setErrors({ ...errors, [name]: target.validationMessage });
    setValues({ ...values, [name]: value });

  }

  const resetForm = useCallback(
    (newIsValid = false, newErrors = {}, newValues = {}/* , newIsValidInput = {} */) => {
      setIsValid(newIsValid);
      setErrors(newErrors);
      setValues(newValues);
      // setIsValidInput(newIsValidInput);
    },
    [setIsValid, setErrors, setValues]
  );

  return { handleChange, resetForm, setIsValid, isValid, errors, values, setValues, /* isValidInput */ };
}
