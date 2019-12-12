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
/**{props.blogs.map(b =>
        <li key={b.id} type="I">
          <Blog key={b.id} blog={b}
            addLike={() => props.addLike(b.id)}
            user={props.user}
            deleteBlog={() => props.deleteBlog(b)}/>
        </li>)} */



/**<li>
        {
          props.users.map((u) => {
            return <Link key={u.id} to={``}>
              
            </Link>;
          })
        }
      </li> */



/**{props.users.map((u) => <tr key={u.id}>
            <td>{u.name? u.name : u.username}</td>
            <td>{u.blogs.length}</td>
          </tr>)}
          
          
          
          
          
          <Link key={u.id} to={`/users/${u.id}`}>
                {u.name? u.name : u.username}
              </Link>*/

export default BlogList;