
const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    state = action.data;
    //console.log('action.data',action.data);
    //console.log('action.data',state);
    return state;
  default:
    return state;
  }
};

//ACTION_CREATORS
export const setUser= (userObj) => {
  //console.log(userObj);
  return {
    type:'SET_USER',
    data: userObj
  };
};


export default userReducer;