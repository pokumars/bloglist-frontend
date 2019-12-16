import React from 'react';
import Logout from './Logout';
//import Blog from './Blog';
import { BrowserRouter as Router, Link,  Route } from 'react-router-dom';

//renders everything once user is signed in
const BlogList = (props) => {
  //props.user, logout, props.blogs, addLike, deleteBlog
  //console.log(user);
  const blogListstyle = {
    borderLeft: '6px solid #1a8cff',
    backgroundColor: 'lightgray',
    margin: '5px 0px'
  };
  return (
  <>
  
    <Logout user={props.user} clearUser={props.logout}/>
    <h2>Blogs</h2>
    <ol>
      {props.blogs.map((b) => <li key={b.id} style={blogListstyle} type="I">
        <Link to={`blogs/${b.id}`} > {b.title} </Link>
      </li>)}
    </ol>
    <Link to="" ></Link>
  </>
  );
};

export default BlogList;