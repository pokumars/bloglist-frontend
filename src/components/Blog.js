import React, { useState } from 'react';

const Blog = (props) => {
  const { blog } = props;
  const [expanded, setExpanded] = useState(false);
  
  const expandStyle = {display: expanded? '': 'none'};
  const blogstyle = {
    borderLeft: '6px solid #1a8cff',
    backgroundColor: 'lightgray',
    margin: "5px 0px"
  };

  return (
    <div style={blogstyle}>
      <div onClick={() => setExpanded(!expanded)}>
        {blog.title} <b>~{blog.author}</b>
      </div>

      <div style = {expandStyle}>
        {blog.likes} likes <button>like</button>
        <p><a href={blog.url}>{blog.url}</a><br/>
        added by {blog.user.name? blog.user.name: blog.user.username}</p>
      </div>

    </div>
  );
}

export default Blog