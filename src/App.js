import React, { useState, useEffect } from 'react';
import blogService from './services/blogs';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import Logout from './components/Logout';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Footer from './components/Footer';
import { useField, useField2 } from './hooks/index';


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  //const [username, setUsername] = useState('');
  //const [password, setPassword] =useState('');
  const username = useField2('text');
  const password = useField2('password');

  const title= useField2('text');
  const author= useField2('text');
  const url= useField2('url');


 
  /*const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');*/

  const [promptMessage, setPropmptMessage] = useState(null);

  const getBlogsHook = () => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll();
      const sortedBlogs = blogs.sort((a, b) => a.likes - b.likes);
      setBlogs(sortedBlogs);
      console.log(blogs);
    };
    getBlogs();
  };
  useEffect(getBlogsHook, []);

  const getBrowserTokenHook = () => {
    const loggedInUser = window.localStorage.getItem('loggedInUser');

    if(loggedInUser){
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  };
  useEffect(getBrowserTokenHook, []);

  const notify= (msg, positive) => {
    setPropmptMessage({
      message: msg,
      positive: positive
    });

    setTimeout(() => {
      setPropmptMessage(null);
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    
    //console.log('login with ', username, password);
    console.log('login with ', username.value, password.value);
    try {
      
      const user = await loginService.login({
        username: username.value, password: password.value
      });

      setUser(user);
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      );

      //setUsername('');
      //setPassword('');
      username.reset();
      password.reset();

      notify(`Welcome ${user.name? user.name :user.username}`, true);

      blogService.setToken(user.token);
    } catch (error) {
      notify('wrong credentials', false);
    }
  };

  const addLike = async (blogObjToUpdate) => {

    const blog = {
      'title': blogObjToUpdate.title,
      'author': blogObjToUpdate.author,
      'url': blogObjToUpdate.url,
      'user':blogObjToUpdate.user.id,
      '_id': blogObjToUpdate.id,
      'likes': blogObjToUpdate.likes + 1,
    };

    const response = await blogService.update(blog);

    setBlogs(blogs.map((b) => b.id ===blog._id.toString()? b = response : b));
  };

  const deleteBlog = async (blog) => {
    try {
      const confirmMessage = window.confirm(`Remove ${blog.title}`);
      if(confirmMessage) {
        const response = await blogService.deleteBlog(blog.id);
        console.log(response);
        notify('deleted successfully', true);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
      }

    } catch (error) {
      notify('deletion failed', false);
    }


  };

  const createBlog = async (event) => {
    event.preventDefault();

    if ( title.value.length<5 || author.value.length<3 || url.value.length<5) {
      title.value.length<5 &&alert('title should be longer than 5 characters');
      author.value.length<3  && alert('author should be longer than 3 characters');
      url.value.length<10 && alert('url should be longer than 10 characters');

      return null;
    }

    const newBlog = {
      'title': title.value,
      'author': author.value,
      'url': url.value,
    };

    //console.log('new blog to be posted ', newBlog);
    //console.log(`author--> ${author.value} title--> ${title.value} url--> ${url.value}`);

    const response = await blogService.create(newBlog);

    setBlogs(blogs.concat(response));

    setPropmptMessage({
      message: `${response.title} has been added to blogs`,
      positive: true
    });

    setTimeout(() => {
      setPropmptMessage(null);
    }, 5000);

    /*setAuthor('');
    setTitle('');
    setUrl('');*/
    author.reset();
    title.reset();
    url.reset();
  };


  const renderLoginForm= () => {
    const usernameProps = Object.assign({}, username);
    delete usernameProps.reset;

    const passwordProps = Object.assign({}, password);
    delete passwordProps.reset;

    return (
      
      <LoginForm handleLogin={handleLogin}
        username={ usernameProps }
        password={passwordProps}/>
    );
  };

  const renderBlogForm = () => {
    const titleProps = Object.assign({}, title);
    delete titleProps.reset;

    const authorProps = Object.assign({}, author);
    delete authorProps.reset;

    const urlProps = Object.assign({}, url);
    delete urlProps.reset;

    return (
      <Togglable buttonLabel="add blog" >
        <BlogForm handleCreateBlog={createBlog}
          title={titleProps} author={authorProps} url={urlProps} />
      </Togglable>
    );

  };
  const logout = () => {
    setUser(null);
    
  };

  //renders everything once user is signed in
  const renderBlogs = () => {
    //console.log(user);
    return (
    <>
      <Logout user={user} clearUser={logout}/>
      <h2>Blogs</h2>
      <ol>
        {blogs.map(b =>
          <li key={b.id} type="I">
            <Blog key={b.id} blog={b}
              addLike={() => addLike(b)}
              user={user}
              deleteBlog={() => deleteBlog(b)}/>
          </li>)}
      </ol>
      {renderBlogForm()}
    </>);
  };

  return(
    <>
      <Notification message={promptMessage}/>
      {user === null
        ? renderLoginForm()
        : renderBlogs()}
      <Footer />
    </>
  );
};

export default App;
