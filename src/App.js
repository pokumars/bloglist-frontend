import React, { useState, useEffect } from 'react';
import blogService from './services/blogs';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] =useState('');
  const [user, setUser] = useState(null);

  const getBlogsHook = () => {
    const getBlogs = async ()=> {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
      console.log(blogs);
    }
    getBlogs();
  }
  useEffect(getBlogsHook, []);

  const getBrowserTokenHook = () => {
    const loggedInUser = window.localStorage.getItem('loggedInUser');

    if(loggedInUser){
      blogService.setToken(user.token);
    }
    
  }
  useEffect(getBrowserTokenHook, []);

  const handleLogin = async (event) =>{
    event.preventDefault()
    console.log('login with ', username, password);
    try {
      const user = await loginService.login({
        username, password
      });

        
      setUser(user);
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      );
      console.log(user);
      setUsername('');
      setPassword('');
      blogService.setToken(user.token);
    } catch (error) {
      console.error("wrong credentials");
    }
  }
  const renderLoginForm= ()=> (
    <LoginForm handleLogin={handleLogin}
    username={username} password={password}
    handleUsernameChange={value => setUsername(value)}
    handlePasswordChange= {(value) => setPassword(value)}/>
  )

  const renderBlogs = () => {
    return blogs.map(b => <Blog key={b.id} blog={b}/>)
  }
  return(
    <>
    {user === null
    ? renderLoginForm()
  : renderBlogs()}

    
    
    </>
  )
}

export default App;
