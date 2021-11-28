import {
  FETCH_FAILURE_AUTH,
  FETCH_START_AUTH,
  FETCH_SUCCESS_AUTH,
  RESET_ERRORS_AUTH,
  CLEAR_ERROR_AUTH,
} from './auth.type';

const initState = {
  load: false,
  token: '',
  errors: [],
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_START_AUTH:
      return {
        ...state,
        load: true,
      };
    case FETCH_SUCCESS_AUTH:
      return {
        ...state,
        load: false,
        token: action.payload,
      };
    case FETCH_FAILURE_AUTH:
      return {
        ...state,
        errors: action.payload,
        load: false,
      };
    case RESET_ERRORS_AUTH:
      return {
        ...state,
        errors: [],
      };
    case CLEAR_ERROR_AUTH:
      const param = action.payload;
      // TODO: Complete
      return {
        ...state,
        errors: [],
      };
    default:
      return state;
  }
};

export default authReducer;
