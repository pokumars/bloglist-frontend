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
  case 'ADD_COMMENT':{
    const changedBlog= action.data;
    
    const allBlogs = state.map((b) => b.id === changedBlog.id? b = changedBlog : b);

    return sortbyLikes(allBlogs);
  }
  

  case 'DELETE_BLOG':{
    console.log(`id --${action.id}  type--${action.id.type}`);
    const blogsNow = state.filter((b) => b.id !== action.id);
    console.log(blogsNow);
    return sortbyLikes(blogsNow);
  }
      
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
    console.log('id', id);
    const blogToChange = await blogService.getBlog(id);

    const changedBlog = {
      ...blogToChange,
      'user': blogToChange.user.id,//this needs to be changed to blogToChange.user.id else it will try to use the user obj that you put in place of user
      'likes': blogToChange.likes + 1,
    };

    const changedBlogInBackend = await blogService.update(changedBlog);

    dispatch({
      type:'LIKE_BLOG',
      data: changedBlogInBackend
    });
  };
};

export const addComment = (updatedBlog) => {
 
  return async dispatch => {
    console.log('action creator updatedBlog',updatedBlog);
    //const bloginBackend = await blogService.getBlog(updatedBlog.id);

    
    //change user from userobject to id else backend doesnt know what to do with it
    const blogCreatorId = updatedBlog.user.id;
    updatedBlog.user= blogCreatorId;

    const changedBlogInBackend = await blogService.update(updatedBlog);

    dispatch({
      type:'ADD_COMMENT',
      data: changedBlogInBackend
    });
  };
};

export const createBlog= (blogObj) => {
  return async dispatch => {
    /*add user obj to newly created blog else it cant find user and
     thus cant render delete button based on who created it*/
    const loggedInUser = window.localStorage.getItem('loggedInUser');
    const user = JSON.parse(loggedInUser);
    blogObj.user = user;

    dispatch({
      type: 'ADD_BLOG',
      data: blogObj
    });
  };
};


export const deleteBlog = (id) => {
  return async dispatch => {

    dispatch({
      type: 'DELETE_BLOG',
      id: id
    });
  };
};
export default blogsReducer;