import {
  GET_SPARKS,
  SPARK_ERROR,
  UPDATE_UPVOTES,
  DELETE_SPARK,
  ADD_SPARK
} from '../actions/types';

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
    case ADD_SPARK:
      return {
        ...state,
        sparks: [payload, ...state.sparks],
        loading: false
      };
    case DELETE_SPARK:
      return {
        ...state,
        sparks: state.sparks.filter(spark => spark._id !== payload),
        loading: false
      };
    case SPARK_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_UPVOTES:
      return {
        ...state,
        sparks: state.sparks.map(spark =>
          spark._id === payload.id
            ? { ...spark, upvotes: payload.upvotes }
            : spark
        ),
        loading: false
      };
    default:
      return state;
  }
}
