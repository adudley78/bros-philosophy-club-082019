import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_SPARKS,
  SPARK_ERROR,
  UPDATE_UPVOTES,
  DELETE_SPARK,
  ADD_SPARK,
  UPDATE_SPARK,
  GET_SPARK,
  ADD_COMMENT,
  UPDATE_COMMENT,
  REMOVE_COMMENT
} from './types';

// Get current spark
export const getCurrentSpark = sparkId => async dispatch => {
  try {
    // Knows which spark to load from id
    const res = await axios.get(`/api/sparks/${sparkId}`);

    dispatch({
      type: GET_SPARK,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SPARK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

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

// Remove spark
export const deleteSpark = sparkId => async dispatch => {
  try {
    const res = await axios.delete(`/api/sparks/${sparkId}`);

    dispatch({
      type: DELETE_SPARK,
      payload: sparkId
    });

    dispatch(setAlert('Spark removed', 'success'));
  } catch (err) {
    dispatch({
      type: SPARK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add or update spark
export const addSpark = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/sparks/', formData, config);

    dispatch({
      type: GET_SPARK,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Spark Updated' : 'Spark created', 'success'));

    if (!edit) {
      history.push('/sparks');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: SPARK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get spark
export const getSpark = sparkId => async dispatch => {
  try {
    const res = await axios.get(`/api/sparks/${sparkId}`);

    dispatch({
      type: GET_SPARK,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SPARK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment
export const addComment = (sparkId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      `/api/sparks/comment/${sparkId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment added', 'success'));
  } catch (err) {
    dispatch({
      type: SPARK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (sparkId, commentId) => async dispatch => {
  try {
    const res = await axios.delete(
      `/api/sparks/comment/${sparkId}/${commentId}`
    );

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment removed', 'success'));
  } catch (err) {
    dispatch({
      type: SPARK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
