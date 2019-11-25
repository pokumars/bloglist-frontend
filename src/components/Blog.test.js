import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import{ prettyDOM, fireEvent } from '@testing-library/dom';
import Blog from './Blog';

describe('<Blog /> tests', () =>  {

  let component;
  const user = {
    'username': 'pokumars',
    'name': 'Oheneba Knobhead',
    'id': '5dce9c2fd04e22385053da74'
  };

  const blog = {
    'title': 'CR7 goat',
    'author': 'Max payne',
    'url': 'https://thesunsucks.com',
    'likes': 3,
    'user': user,
    'id': '5dd42a980dc4382e786862d7'
  };
  
  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user}/>
    );
  });

  test('only name and author are shown by default', () => {
    /*component = render(
      <Blog blog={blog} user={user}/>
    );*/
    const detailsDiv = component.container.querySelector('.blogDetails');

    expect(detailsDiv).toHaveStyle('display:none');
  });

  test('details show on clicking title/author', () => {
    const titleAuthor = component.container.querySelector('.blogAuthorTitle');
    fireEvent.click(titleAuthor);
    
    const detailsDiv = component.container.querySelector('.blogDetails');

    expect(detailsDiv).not.toHaveStyle('display:none');

  });

});