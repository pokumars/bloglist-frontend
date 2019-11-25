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
              <td><input  minLength="5" required {...title} /></td>
            </tr>

            <tr>
              <td>author</td>
              <td><input minLength="3" required {...author} />
              </td>
            </tr>

            <tr>
              <td>url</td>
              <td>
                <input required {...url} />
              </td>
            </tr>
          </tbody>
        </table>

        <button type="submit" >create</button>
      </form>
    </>
  );
};

export default BlogForm;