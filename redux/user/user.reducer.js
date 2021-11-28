import { FETCH_SUCCESS_USER } from './user.type';

const initState = {
  user: {},
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_SUCCESS_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
