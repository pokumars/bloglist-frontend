import { useState } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
    //console.log(event.target.value);
  };
  const reset= () => {
    setValue('');
  };
  
  return {
    type,
    value,
    onChange,
    reset
  };
};

//customhook
export const useCounter = () => {
  const [value, setValue] = useState(0);

  const decrease = () => {
    setValue(value -1);
  };

  const increase = () => {
    setValue(value +1);
  };

  const zero = () => {
    setValue(0);
  };

  return{
    value,
    increase,
    decrease,
    zero
  };
};

