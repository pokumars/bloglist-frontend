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
    <h2>About</h2>
    <p>Add blogs and articles that you find interestng here.
       They can be commented on and liked. The original poster can delete. </p>
  </>
  );
};

export default LoginForm;