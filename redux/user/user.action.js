import { FETCH_SUCCESS_USER } from './user.type';
import { fetch } from '../../helpers/fetch';

const fetchSuccessUser = (payload) => ({
  type: FETCH_SUCCESS_USER,
  payload,
});

export const fetchUser = () => async (dispatch) => {
  try {
    const res = await fetch({ url: 'users/me' });

    console.log({ successUser: res.data });
    // dispatch({ type: FETCH_SUCCESS_AUTH, payload: res.data });
    dispatch(fetchSuccessUser(res.data));
  } catch (error) {
    // navigation.navigate('Auth');
    // dispatch({
    //   type: FETCH_FAILURE_AUTH,
    //   payload: error.response.data.errors ? error.response.data.errors : [],
    // });
    // dispatch(
    //   fetchFailureAuth(
    //     error.response.data.errors ? error.response.data.errors : [],
    //   ),
    // );
    // dispatch({
    //   type: FETCH_FAILURE_AUTH,
    //   payload: error.response.data.errors ? error.response.data.errors : [],
    // })
  }
};
