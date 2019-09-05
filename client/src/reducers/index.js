import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import spark from './spark';

export default combineReducers({
  alert,
  auth,
  profile,
  spark
});
