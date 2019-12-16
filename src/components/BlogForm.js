import React from 'react';

const BlogForm = (props) => {
  const { title, author, url, handleCreateBlog } = props;


  return (
    <>
      <form onSubmit= {handleCreateBlog}>
        <table>
          <tbody>
            <tr>
              <td>title</td>
              <td><input id="titleInput" minLength="5" required {...title} /></td>
            </tr>

            <tr>
              <td>author</td>
              <td><input id="authorInput" minLength="3" required {...author} />
              </td>
            </tr>

            <tr>
              <td>url</td>
              <td>
                <input id="urlInput" required {...url} />
              </td>
            </tr>
          </tbody>
        </table>

        <button type="submit" id="createBlogBtn" >create</button>
      </form>
    </>
  );
};

export default BlogForm;