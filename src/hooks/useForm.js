import { useState } from 'react';

const useForm = (initialValues) => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleInputChange = (prop) => (e) => {
    setFormValues({ ...formValues, [prop]: e.target.value });
  };

  const resetForm = () => {
    setFormValues(initialValues);
  };

  return [formValues, handleInputChange, resetForm];
};

export default useForm;
