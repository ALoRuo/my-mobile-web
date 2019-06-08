/**
 * Created by dell on 2019/4/20.
 */
export default function(state={}, action) {
    switch (action.type) {
        case 'ORDER_SEARCH_RESULT': {
            return action.payload
        }
        case 'SET_ACCESS_ORDER_LIST':{
            return action.payload
        }
        case 'SELECT_ADDRESS' :{
            return action.payload
        }
        default:
            return state;
    }
}