import blogService from '../services/blogs';

const sortbyLikes =(initiallArr) => initiallArr.sort((a, b) => b.likes - a.likes);

const blogsReducer = (state= [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return sortbyLikes(action.data);

  case 'ADD_BLOG':{
    return sortbyLikes([...state, action.data]);
  }

  case 'LIKE_BLOG':{
    const changedBlog= action.data;
    
    const allBlogs = state.map((b) => b.id === changedBlog.id? b = changedBlog : b);

    return sortbyLikes(allBlogs);
  }

  case 'DELETE_BLOG':

    return;
  
  default:
    return state;
  }
};


export const initialiseBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    });
  };
};

export const addLike = (id) => {
  return async dispatch => {
    const blogToChange = await blogService.getBlog(id);

    const changedBlog = {
      ...blogToChange,
      'likes': blogToChange.likes + 1,
    };

    const changedBlogInBackend = await blogService.update(changedBlog);

    dispatch({
      type:'LIKE_BLOG',
      data: changedBlogInBackend
    });
  };
};

export const createBlog= (blogObj) => {
  return async dispatch => {
    //const response = await blogService.create(blogObj);
    dispatch({
      type: 'ADD_BLOG',
      data: blogObj
    });
  };
};
export default blogsReducer;