import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import CommentList from './CommentList';
import { Button } from 'react-bootstrap';


const BlogwithoutHistory = (props) => {
  
  const { blog, addLike, deleteBlog, user, commentField, handleAddComment } = props;
  const [expanded, setExpanded] = useState(false);

  if ( blog === undefined) {//prevents crashing until blog has been received by app 
    return null;
  }

  //const expandStyle = { display: expanded? '': 'none' };
  const showDeleteStyle= { display: user.username=== blog.user.username? '': 'none' };
  const blogstyle = {
    borderLeft: '6px solid #1a8cff',
    backgroundColor: 'lightgray',
    margin: '5px 0px'
  };

  const deleteAndRedirect = () => {
    deleteBlog(blog);
    props.history.push('/');
  };

  return (
    <>
    <div style={blogstyle} className="blog">
      <div onClick={() => setExpanded(!expanded)} className="blogAuthorTitle">
        {blog.title} <b>~{blog.author}</b>
      </div>

      <div className="blogDetails">
        <p> {blog.likes} likes <Button onClick={ addLike } >like</Button> </p>
        <p><a href={blog.url}>{blog.url}</a><br/>
        added by {blog.user.name ? blog.user.name: blog.user.username}</p>
        <Button variant="danger" size="sm" onClick={deleteAndRedirect}
          style={showDeleteStyle}>delete</Button>
      </div>
    </div>
    <CommentList blog={blog} handleAddComment={handleAddComment}/>
    
    </>
  );
};

const Blog = withRouter(BlogwithoutHistory);
export default Blog;