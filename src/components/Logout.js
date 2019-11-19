import React from 'react';

const Logout = (props)=> {
  const { user, clearUser } = props;

  const logMeOut = ()=> {
    window.localStorage.clear();
    clearUser();
  }
  return(
    <>
      {user.name} is logged in<button onClick={logMeOut}>logout</button>
    </>
  )
}

export default Logout;