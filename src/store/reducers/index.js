/**
 * Created by dell on 2019/4/2.
 */
import { combineReducers } from 'redux';
import payReducer from './pay-reducer';
import userReducer from './user-reducer';
import orderReducer from './order-reducer';
import productReducer from './product-reducer';
const allReducers = {
    payMessage: payReducer,
    user:userReducer,
    orderMessage:orderReducer,
    productMessage:productReducer
};
const rootReducer = combineReducers(allReducers);
export default rootReducer;