import React from 'react';
import CommentForm from './CommentForm';

const CommentList = ({ blog, handleAddComment }) => {
//{ comment, handleAddComment }
  return (
    <>
      <h2>Comments</h2>
      <CommentForm blog={blog} handleAddComment={handleAddComment} />
      <ul>
        {blog.comments.length === 0 ? 
          <p>No comments on this blog </p> :
          blog.comments.map((c) => <li key ={c._id}>{c.content}</li>)}
      </ul>
    
    </>
  );
};

export default CommentList;