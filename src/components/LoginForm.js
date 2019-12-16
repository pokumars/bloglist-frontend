import React from 'react';
import { Form, Button } from 'react-bootstrap';

const LoginForm = (props) => {
  const { handleLogin, username, password } = props;

  return(
  <>
    <h2>Log in to application</h2>
    <Form onSubmit={handleLogin}>
      <Form.Group >
        <div className="username">
          <Form.Label>username</Form.Label>
          <Form.Control
            id="usernameInput" {...username}
          />
        </div>
        <div className="password">
          <Form.Label>password</Form.Label>
          <Form.Control
            id="passwordInput" {...password}
          />
        </div>
        <Button type="submit">login</Button>
      </Form.Group>
    </Form>
  </>
  );
};

export default LoginForm;