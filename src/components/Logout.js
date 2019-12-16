import React from 'react';
import { Button } from 'react-bootstrap';

const Logout = (props) => {
  const { user, clearUser } = props;
  //console.log('user in Logout', user);

  const logMeOut = () => {
    window.localStorage.clear();
    clearUser();
  };
  // {user.name? user.name: user.username} is logged in
  return(
    <>
      {user.name? user.name: user.username} is logged in
      <Button variant="outline-danger" size="sm" onClick={logMeOut}>logout</Button>
    </>
  );
};

export default Logout;