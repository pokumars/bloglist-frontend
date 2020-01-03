import React from 'react';
import { useField } from '../hooks';
import { Button, Form, Row, Col } from 'react-bootstrap';


//{ commentField, handleAddComment, blog }
const CommentForm = ({ blog, handleAddComment }) => {
  //pass the blog object to the handleAddComment function
  const comment = useField('text');
  const commentFieldProps = Object.assign({}, comment);
  delete commentFieldProps.reset;

  const modifyBlog = (event) => {
    event.preventDefault();
    console.log(comment.value);
    //const updatedBlog 
    blog.comments = [...blog.comments, { content: comment.value }];
    console.log('updated blog',blog);
    handleAddComment(blog);
    comment.reset();
  };

  return (
  <>
  <Form onSubmit={modifyBlog}>
    <Row>
      <Col>
        <Form.Control
          required {...commentFieldProps} placeholder="add anonymous comment here"
        />
      </Col>
      <Col>
        <Button  type="submit" >add comment</Button>
      </Col>
    </Row>
  </Form>
  </>
  );
};

export default CommentForm;