import axios from 'axios';
import { setAlert } from './alert';
import { GET_SPARKS, SPARK_ERROR, UPDATE_UPVOTES } from './types';

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

// Add upvote
export const addUpvote = sparkId => async dispatch => {
  try {
    const res = await axios.put(`/api/sparks/upvote/${sparkId}`);

    dispatch({
      type: UPDATE_UPVOTES,
      payload: { sparkId, upvotes: res.data }
    });
  } catch (err) {
    dispatch({
      type: SPARK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove upvote
export const removeUpvote = sparkId => async dispatch => {
  try {
    const res = await axios.put(`/api/sparks/unupvote/${sparkId}`);

    dispatch({
      type: UPDATE_UPVOTES,
      payload: { sparkId, upvotes: res.data }
    });
  } catch (err) {
    dispatch({
      type: SPARK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
