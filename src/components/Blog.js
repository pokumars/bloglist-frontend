import React, { useState } from 'react';

const Blog = (props) => {
  const { blog, addLike, deleteBlog, user } = props;
  const [expanded, setExpanded] = useState(false);

  const expandStyle = { display: expanded? '': 'none' };
  const showDeleteStyle= { display: user.username=== blog.user.username? '': 'none' };
  const blogstyle = {
    borderLeft: '6px solid #1a8cff',
    backgroundColor: 'lightgray',
    margin: '5px 0px'
  };

  return (
    <div style={blogstyle} className="blog">
      <div onClick={() => setExpanded(!expanded)} className="blogAuthorTitle">
        {blog.title} <b>~{blog.author}</b>
      </div>

      <div style = {expandStyle} className="blogDetails">
        <p> {blog.likes} likes <button onClick={ addLike } >like</button> </p>
        <p><a href={blog.url}>{blog.url}</a><br/>
        added by {blog.user.name ? blog.user.name: blog.user.username}</p>
        <button onClick={deleteBlog}
          style={showDeleteStyle}>delete</button>
      </div>

    </div>
  );
};

export default Blog;