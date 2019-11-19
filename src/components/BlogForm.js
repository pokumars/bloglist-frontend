import React from 'react';

const BlogForm = (props) => {
  const {title, handleTitleChange, author, handleAuthorChange,
     url,handleUrlChange, handleCreateBlog } = props;


  return (
    <>
      <form onSubmit= {handleCreateBlog}>
        title <input value={title} type= "text" minLength="5" required
        onChange={({ target }) => handleTitleChange(target.value)} /><br/>
        

        author <input value={author} type= "text" minLength="3" required
        onChange={({ target }) => handleAuthorChange(target.value)} /><br/>

        url <input value={url} type= "url" required
        onChange={({ target }) => handleUrlChange(target.value)} /><br/>

        <button type="submit" >create</button>
      </form>
    </>
  )
}

export default BlogForm;