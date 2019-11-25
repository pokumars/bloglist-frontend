import React from 'react';
jest.mock('./services/blogs');
/**If your app uses a browser API that you need to mock in your tests or if you just
 *  need a global setup before running your tests, add a src/setupTests.js to your 
 * project. It will be automatically executed before running your tests. */
import App from './App';
import { render, waitForElement } from '@testing-library/react';


describe('<App />', () => {
  test('only login form and no blogs are displayed until logged in', async () => {
    let component;

    component = render(
      <App />
    );

    await waitForElement(
      () => component.getByText('login')
    );

    const username = component.getByText('username');
    const password = component.getByText('password');

    expect(component.container).toHaveTextContent('Log in to application');

    expect(component.container.querySelector('.blog')).toBeNull();   
  });

  test('blogs are rendered after login', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    };
    
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    
    let component;
    component = render(
      <App />
    );

    component.rerender(<App />);

    await waitForElement(
      () => component.container.querySelector('.blog')
    );

    const blogsX= component.container.querySelectorAll('.blog');
    expect(blogsX.length).toBe(4);

    
    expect(component.container).toHaveTextContent(
      '3 Ways to clone objects in JavaScript'
    );
    
    expect(component.container).toHaveTextContent(
      'Learn these quick tricks in PostgreSQL'
    );
  });
});
