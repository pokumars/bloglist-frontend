import React from 'react';

const LoginForm = (props) => {
  const { handleLogin,handleUsernameChange,
    username, password, handlePasswordChange } = props;
  return(
  <>
    <h2>Log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type="text" value={username}
          onChange= {({ target }) => handleUsernameChange(target.value)}/>
      </div>
      <div>
        password
        <input type="password" value={password}
          onChange={({ target }) => handlePasswordChange(target.value)} />
      </div>
      <button type="submit">login</button>

    </form>
  </>
  );
};

export default LoginForm;