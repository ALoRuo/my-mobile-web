/**
 * Created by dell on 2019/4/2.
 */
import { combineReducers } from 'redux';
import payReducer from './pay-reducer';
import userReducer from './user-reducer';
const allReducers = {
    payMessage: payReducer,
    user:userReducer,
};
const rootReducer = combineReducers(allReducers);
export default rootReducer;