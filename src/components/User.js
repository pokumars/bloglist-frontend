import React from 'react';

const User = ({ user }) => {
  if ( user === undefined) {//prevents crashing until user has been received by app 
    return null;
  }
  return (
    <>
      <h2>{user.name ? user.name: user.username}</h2>
      <h4>Added Blogs</h4>
      <p>{user.blogs.length === 0 && 'No added blogs'}</p>
      <ul>
        { user.blogs.map((b) => <li key={b.id}>{b.title}</li>) }
      </ul>
    </>
  );
};

export default User;