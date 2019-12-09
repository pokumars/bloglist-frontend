
const notificationReducer = (state = null, action) => {

  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification;
  case 'REMOVE_NOTIFICATION':
    return null;
  default:
    return state;
  }
};

export const setNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    notification: message
  };
};

export const removeNotification = () => {
  return {
    type: 'SET_NOTIFICATION',
    notification: null
  };
};

export const notifyAsync = (msg, positive) => {
  return async dispatch => {
    dispatch(setNotification({
      message: msg,
      positive: positive
    }));
    setTimeout(() => {
      dispatch(removeNotification());
    },5000);
  };
};



export default notificationReducer;