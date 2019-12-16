import React from 'react';

const LoginForm = (props) => {
  const { handleLogin, username, password } = props;

  return(
  <>
    <h2>Log in to application</h2>
    <form onSubmit={handleLogin}>
      <div className="username">
        username
        <input id="usernameInput" {...username}/>
      </div>
      <div className="password">
        password
        
        <input id="passwordInput" {...password} />
      </div>
      <button type="submit">login</button>

    </form>
  </>
  );
};

export default LoginForm;