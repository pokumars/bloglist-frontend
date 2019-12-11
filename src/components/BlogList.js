import React from 'react';
import Logout from './Logout';
import Blog from './Blog';
import { BrowserRouter as Router, Link,  Route } from 'react-router-dom';


//renders everything once user is signed in
const BlogList = (props) => {
  //props.user, logout, props.blogs, addLike, deleteBlog
  //console.log(user);
  return (
  <>

    <Logout user={props.user} clearUser={props.logout}/>
    <h2>Blogs</h2>
    <ol>
      {props.blogs.map(b =>
        <li key={b.id} type="I">
          <Blog key={b.id} blog={b}
            addLike={() => props.addLike(b.id)}
            user={props.user}
            deleteBlog={() => props.deleteBlog(b)}/>
        </li>)}
      
    </ol>
    {/*renderBlogForm()*/}
  </>);
};

export default BlogList;