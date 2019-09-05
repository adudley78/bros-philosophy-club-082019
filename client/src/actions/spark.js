import axios from 'axios';
import { setAlert } from './alert';
import { GET_SPARKS, SPARK_ERROR } from './types';

// Get sparks
export const getSparks = () => async dispatch => {
  try {
    const res = await axios.get('/api/sparks');

    dispatch({
      type: GET_SPARKS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SPARK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
