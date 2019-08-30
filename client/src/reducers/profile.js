import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_USERS_SPARKS
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  sparks: [],
  // Add sparks
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        // @todo sparks: [],
        loading: false
      };
    case GET_USERS_SPARKS:
      return {
        ...state,
        sparks: payload,
        loading: false
      };
    default:
      return state;
  }
}
