import { combineReducers, createStore, applyMiddleware } from 'redux';
import userReducer from './reducers/userReducer';
import notificationReducer from './reducers/notificationReducer';
import thunk from 'redux-thunk';
import blogsReducer from './reducers/blogsReducer';

const reducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  blogs: blogsReducer
});
// redux-thunk-library enables us to create asynchronous actions
const store = createStore(
  reducer,
  applyMiddleware(thunk));
console.log(store.getState());

store.subscribe(() => console.log(store.getState()));

export default store;
