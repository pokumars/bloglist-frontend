import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible? 'none' :'' };
  const showWhenVisible = { display: visible? '' : 'none' };

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  };

  const toggleVisibility = () => setVisible(!visible);

  return (
    <>
      <div style= {hideWhenVisible}>
        <Button onClick={toggleVisibility} >{props.buttonLabel}</Button>
      </div>
      <div style= {showWhenVisible}>
        {props.children}
        <Button variant="outline-danger" size="sm" onClick={toggleVisibility}>cancel</Button>
      </div>
    </>
  );
};

export default Togglable;