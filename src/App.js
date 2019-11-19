import React, { useState, useEffect } from 'react';
import blogService from './services/blogs';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import Logout from './components/Logout';
import loginService from './services/login';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] =useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

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
      const user = JSON.parse(loggedInUser);
      setUser(user);
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

  const createBlog = async (event) => {
    event.preventDefault();

    if ( title.length<5 || author.length<3 || url.length<10) {
      title.length<5 &&alert("title should be longer than 5 characters");
      author.length<3  && alert("author should be longer than 3 characters");
      url.length<10 && alert("url should be longer than 10 characters");
      return null;
    }

    const newBlog = {
      "title": title,
      "author": author,
      "url": url,
    }

    //console.log('new blog to be posted ', newBlog);
    //console.log(`author--> ${author} title--> ${title} url--> ${url}`);

    const response = await blogService.create(newBlog);

    setBlogs(blogs.concat(response));

    setAuthor('');
    setTitle('');
    setUrl('');
  }


  const renderLoginForm= ()=> {
    return (
      <LoginForm handleLogin={handleLogin}
      username={username} password={password}
      handleUsernameChange={value => setUsername(value)}
      handlePasswordChange= {(value) => setPassword(value)}/>
    );
  }
  const renderBlogForm = () => {
    return (
      <BlogForm handleCreateBlog={createBlog} 
          title={title} author={author} url={url}
          handleTitleChange={(value) => setTitle(value)}
          handleAuthorChange= {(value) => setAuthor(value)}
          handleUrlChange={(value) => setUrl(value)}/>
    );

  }

  //renders everything once user is signed in
  const renderBlogs = () => {
    return (<>
      <Logout user={user} clearUser={() => setUser(null)}/>
      <h2>Blogs</h2>
      <ol>
        {blogs.map(b => 
        <li key={b.id} type="I"><Blog key={b.id} blog={b}/></li>)}
      </ol>
      {renderBlogForm()}
    </>)
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
