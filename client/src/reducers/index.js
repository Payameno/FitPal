import { combineReducers } from 'redux';
import userReducer from './userReducer';
import errorsReducer from './errorReducer';

const rootReducer = combineReducers({
  user: userReducer,
  errors: errorsReducer
});
export default rootReducer;