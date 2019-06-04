import { combineReducers }   from 'redux'
import authReducer from './authReducer';
import errorhReducer from './errorReducer';
import profileReducers from './profileReducers'
export default combineReducers({
    auth: authReducer,
    errors: errorhReducer,
    profile:profileReducers
});