/**
 * Created by dell on 2019/4/2.
 */
import { createStore } from "redux";
import rootReducer from './reducers';

let store = createStore(rootReducer);

export default store;