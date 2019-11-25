import { useState } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  /*const onChange = (event) => {
    setValue(event.target);
  };*/

  const onChange = (val) => {
    setValue(val);
    console.log(value);
  };

  return {
    type,
    value,
    onChange
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

