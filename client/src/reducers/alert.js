import { SET_ALERT, REMOVE_ALERT } from './actions/types';

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // Dispatched when action invoked in the alerts component
    case SET_ALERT:
      // Include alerts already in state and add new alert
      // State including the new payload passed down to the component
      return [...state, payload];
    case REMOVE_ALERT:
      // payload will be an alert id
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
