import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

describe('<SimpleBlog /> Tests', () => {
  let component;
  const blog = {
    'title': 'CR7 goat',
    'author': 'Max payne',
    'url': 'https://thesunsucks.com',
    'likes': 3
  };

  beforeEach(() => {
    component = render(
      <SimpleBlog blog={blog} onClick={() => blog.likes +=1}/>
    );
  });

  test('SimpleBlog renders', () => {
    const blogTitleAuthor = component.getByText(`${blog.title} ${blog.author}`);
    const blogLikes = component.container.querySelector('.likes');
  
    expect(blogLikes).toHaveTextContent(
      `blog has ${blog.likes} likes`
    );
    expect(blogTitleAuthor).toBeDefined();
  
    expect(blogTitleAuthor).toHaveTextContent(
      `${blog.title} ${blog.author}`
    );

  });

  
});

test('click like twice, adds like twice', () => {
  const blog = {
    'title': 'CR7 goat',
    'author': 'Max payne',
    'url': 'https://thesunsucks.com',
    'likes': 3
  };
  const mockHandler = jest.fn();

  const component = render(
    <SimpleBlog blog={blog} onClick={mockHandler}/>
  );

  const LikeButton = component.getByText('like');

  fireEvent.click(LikeButton);
  fireEvent.click(LikeButton);

  expect(mockHandler.mock.calls.length).toBe(2);
});

