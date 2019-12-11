import React from 'react';

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
      <button onClick={logMeOut}>logout</button>
    </>
  );
};

export default Logout;