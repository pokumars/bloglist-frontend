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
import { useField } from './hooks/index';
import { setUser } from './reducers/userReducer';
import { removeNotification, setNotification, notifyAsync } from './reducers/notificationReducer';
import { connect } from 'react-redux';
import { initialiseBlogs, addLike } from './reducers/blogsReducer';


const App = (props) => {
  //const [blogs, setBlogs] = useState([]);

  // useField replaces ---> const [username, setUsername] = useState('');
  const username = useField('text');
  const password = useField('password');

  const title= useField('text');
  const author= useField('text');
  const url= useField('url');

  const getBlogsHook = () => {
    props.initialiseBlogs();
  };
  useEffect(getBlogsHook, []);

  const getBrowserTokenHook = () => {
    const loggedInUser = window.localStorage.getItem('loggedInUser');

    if(loggedInUser){
      const user = JSON.parse(loggedInUser);
      props.setUser(user);
      //console.log('user in local storage',user);
      blogService.setToken(user.token);
    }
  };
  useEffect(getBrowserTokenHook, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      
      const user = await loginService.login({
        username: username.value, password: password.value
      });

      props.setUser(user);
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      );

      username.reset();
      password.reset();

      props.notifyAsync(`Welcome ${user.name? user.name :user.username}`, true);

      blogService.setToken(user.token);
    } catch (error) {
      props.notifyAsync('wrong credentials', false);
    }
  };

  /*const addLike = async (blogObjToUpdate) => {

    const blog = {
      'title': blogObjToUpdate.title,
      'author': blogObjToUpdate.author,
      'url': blogObjToUpdate.url,
      'user':blogObjToUpdate.user.id,
      '_id': blogObjToUpdate.id,
      'likes': blogObjToUpdate.likes + 1,
    };

    const response = await blogService.update(blog);

    //setBlogs(blogs.map((b) => b.id ===blog._id.toString()? b = response : b));
  };*/
  const addLike = (id) => {
    props.addLike(id);
  };

  const deleteBlog = async (blog) => {
    try {
      const confirmMessage = window.confirm(`Remove ${blog.title}`);
      if(confirmMessage) {
        const response = await blogService.deleteBlog(blog.id);
        console.log(response);
        props.notifyAsync('deleted successfully', true);
        //setBlogs(blogs.filter((b) => b.id !== blog.id));
      }

    } catch (error) {
      props.notifyAsync('deletion failed', false);
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
    //setBlogs(blogs.concat(response));

    props.notifyAsync(`${response.title} has been added to blogs`, true);

    author.reset();
    title.reset();
    url.reset();
  };


  const renderLoginForm= () => {
    //The input element should not be given a reset attribute. delete that
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
    props.setUser(null);
    
  };

  //renders everything once user is signed in
  const renderBlogs = () => {
    //console.log(user);
    return (
    <>
      <Logout user={props.user} clearUser={logout}/>
      <h2>Blogs</h2>
      <ol>
        {props.blogs.map(b =>
          <li key={b.id} type="I">
            <Blog key={b.id} blog={b}
              addLike={() => addLike(b.id)}
              user={props.user}
              deleteBlog={() => deleteBlog(b)}/>
          </li>)}
      </ol>
      {renderBlogForm()}
    </>);
  };

  return(
    <>
      <Notification message={props.promptMessage}/>
      {props.user === null
        ? renderLoginForm()
        : renderBlogs()}
      <Footer />
    </>
  );
};

const mapDispatchToProps = {
  setUser,
  removeNotification,
  setNotification,
  notifyAsync,
  initialiseBlogs,
  addLike
};

const mapStateToProps =(state) => {
  return {
    user: state.user,
    promptMessage: state.notification,
    blogs: state.blogs
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
