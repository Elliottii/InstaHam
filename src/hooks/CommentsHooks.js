import {useState} from 'react';

const useCommentsForm = (callback) => {
  const [inputs, setInputs] = useState({
    comment: '',
  });

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };
  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => {
      return {
        ...inputs,
        [event.target.name]: event.target.value,
      };
    });
  };
  return {
    handleSubmit,
    handleInputChange,
    inputs,
    setInputs,
  };
};

export default useCommentsForm;
