import React, { useEffect } from 'react';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Footer from './components/Footer';
import { connect } from 'react-redux';
import { useField } from './hooks/index';
import { setUser } from './reducers/userReducer';
import { removeNotification, setNotification, notifyAsync } from './reducers/notificationReducer';
import { getUsers } from './reducers/allUsersReducer';
import { initialiseBlogs, addLike, createBlog, deleteBlog, addComment } from './reducers/blogsReducer';
import UserList from './components/UserList';
import BlogList from './components/BlogList';
import { BrowserRouter as Router, Link,  Route } from 'react-router-dom';
import Blog from './components/Blog';
import User from './components/User';


const App = (props) => {
  // useField replaces ---> const [username, setUsername] = useState('');
  const username = useField('text');
  const password = useField('password');

  const title= useField('text');
  const author= useField('text');
  const url= useField('url');

  /*const comment = useField('text');
  const commentFieldProps = Object.assign({}, comment);
  delete commentFieldProps.reset;*/

  const getBlogsAndUsersHook = () => {
    props.initialiseBlogs();
    props.getUsers();
  };
  useEffect(getBlogsAndUsersHook, []);

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

  const userById=(id) => props.allUsers.find(u => u.id === id);
  const blogById = (id) => props.blogs.find(b => b.id === id);

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

  const deleteBlog = async (blog) => {
    try {
      const confirmDelete = window.confirm(`Remove ${blog.title}`);
      if(confirmDelete) {
        const response = await blogService.deleteBlog(blog.id);
        //console.log(response);
        //console.log('blog.id---->',blog.id);
        props.deleteBlog(blog.id);
        response && props.notifyAsync('deleted successfully', true);
        //setBlogs(blogs.filter((b) => b.id !== blog.id));
        
      }

    } catch (error) {
      props.notifyAsync('deletion failed', false);
      console.error(error);
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

    //this is done here so that I can give notification ONLY when post request succeeds
    const response = await blogService.create(newBlog);
    props.createBlog(response);

    response && props.notifyAsync(`${response.title} has been added to blogs`, true);

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

  const renderBlogs = () => {
    //console.log(user);
    return (
      <div>      
        <BlogList user={props.user}
          blogs={props.blogs}
          logout={logout}
          addLike={props.addLike}
          deleteBlog={deleteBlog}
        />
        {renderBlogForm()}
      </div>
    );
  };

  const padding = { padding: 5 };

  return(
    <div className="container">
         
      <Router>
        {props.user && <div>
          <Link style={padding} to="/">home</Link>
          <Link style={padding} to="/users">users</Link>
        </div>}
        <Notification message={props.promptMessage}/> 

        <Route exact path="/" >
          {props.user === null
            ? renderLoginForm()
            : renderBlogs()}
        </Route>

        <Route exact path="/users" render={() => <UserList users={props.allUsers}/>} />
        
        {<Route path="/users/:id" render={({ match }) => 
          <User user={userById(match.params.id)}/>} />}

        <Route path="/blogs/:id" render={({ match }) => 
          <Blog blog={blogById(match.params.id)}
            addLike={() => props.addLike(match.params.id)}
            user={props.user} handleAddComment={props.addComment}
            deleteBlog={deleteBlog}/>} />
      </Router>

      <Footer user={props.user}/>
    </div>
  );
};
/** commentField={commentFieldProps}
            handleAddComment={addCommentToBlog} */

const mapDispatchToProps = {
  setUser,
  removeNotification,
  setNotification,
  notifyAsync,
  initialiseBlogs,
  addLike,
  createBlog,
  deleteBlog,
  getUsers,
  addComment
};

const mapStateToProps =(state) => {
  return {
    user: state.user,
    promptMessage: state.notification,
    blogs: state.blogs,
    allUsers: state.allUsers
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
