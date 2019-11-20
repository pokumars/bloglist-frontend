import React from 'react';

const BlogForm = (props) => {
  const {title, handleTitleChange, author, handleAuthorChange,
     url,handleUrlChange, handleCreateBlog } = props;


  return (
    <>
      <form onSubmit= {handleCreateBlog}>
        <table>
          <tbody>
            <tr>
              <td>title</td> 
              <td><input value={title} type= "text" minLength="5" required
            onChange={({ target }) => handleTitleChange(target.value)} /></td>
            </tr>

            <tr>
              <td>author</td>
              <td><input value={author} type= "text" minLength="3" required
                onChange={({ target }) => handleAuthorChange(target.value)} />
              </td>
            </tr>

            <tr>
              <td>url</td>
              <td>
                <input value={url} type= "url" required
                  onChange={({ target }) => handleUrlChange(target.value)} />
              </td>
            </tr>
          </tbody>
        </table>

        <button type="submit" >create</button>
      </form>
    </>
  )
}

export default BlogForm;