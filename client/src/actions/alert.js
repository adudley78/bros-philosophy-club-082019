import { SET_ALERT, REMOVE_ALERT } from './types';
import uuid from 'uuid';

// Called inside the alerts component
export const setAlert = (msg, alertType) => dispatch => {
  // Generate random id
  const id = uuid.v4();
  // Dispatch alert with msg, type, and id
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });
};
