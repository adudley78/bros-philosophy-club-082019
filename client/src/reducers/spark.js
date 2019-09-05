import { GET_SPARKS, SPARK_ERROR } from '../actions/types';

const initialState = {
  sparks: [],
  spark: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SPARKS:
      return {
        ...state,
        sparks: payload,
        loading: false
      };
    case SPARK_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
