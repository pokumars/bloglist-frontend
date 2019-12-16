import React from 'react';
import { Form, Button } from 'react-bootstrap';

const BlogForm = (props) => {
  const { title, author, url, handleCreateBlog } = props;


  return (
    <>
      <Form onSubmit= {handleCreateBlog}>
        <table>
          <tbody>
            <tr>
              <td><Form.Label>title</Form.Label></td>
              <td>
                <Form.Control id="titleInput" minLength="5" required {...title} />
              </td>
            </tr>

            <tr>
              <td><Form.Label>author</Form.Label></td>
              <td>
                <Form.Control id="authorInput" minLength="3" required {...author} />
              </td>
            </tr>

            <tr>
              <td><Form.Label>url</Form.Label></td>
              <td>
                <Form.Control id="urlInput" required {...url} />
              </td>
            </tr>
          </tbody>
        </table>

        <Button type="submit" id="createBlogBtn" >create</Button>
      </Form>
    </>
  );
};

export default BlogForm;