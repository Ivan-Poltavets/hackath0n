import {
  FETCH_START_AUTH,
  FETCH_SUCCESS_AUTH,
  FETCH_FAILURE_AUTH,
  CLEAR_ERROR_AUTH,
  RESET_ERRORS_AUTH,
} from './auth.type';
import { fetchData } from '../../helpers/fetch';

const fetchStartAuth = () => ({
  type: FETCH_START_AUTH,
});

const fetchSuccessAuth = (payload) => ({
  type: FETCH_SUCCESS_AUTH,
  payload,
});

const fetchFailureAuth = (payload) => ({
  type: FETCH_FAILURE_AUTH,
  payload,
});

export const resetErrorsAuth = () => ({
  type: RESET_ERRORS_AUTH,
});

export const clearErrorAuth = (payload) => ({
  type: CLEAR_ERROR_AUTH,
  payload,
});

export const fetchAuth =
  (isLogin, credentials, navigation) => async (dispatch) => {
    try {
      dispatch(fetchStartAuth());
      console.log({
        credentials,
        url: `users/${isLogin ? 'login' : 'register'}`,
      });
      const res = await fetchData({
        method: 'post',
        url: `users/${isLogin ? 'login' : 'register'}`,
        data: credentials,
      });

      console.log({ res });
      if ('details' in res) {
        dispatch(
          fetchFailureAuth(
            res.details.map((error) => {
              return {
                param: error.context.key,
                message: error.message,
              };
            }),
          ),
        );
      } else if ('message' in res) {
        dispatch(fetchFailureAuth([res]));
      } else {
        dispatch(fetchSuccessAuth(res.access_token));
      }
    } catch (error) {
      console.log({ error });
      navigation.navigate('Auth');
    }
  };
