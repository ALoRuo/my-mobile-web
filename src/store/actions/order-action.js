/**
 * Created by dell on 2019/4/20.
 */
const ORDER_SEARCH_RESULT = 'ORDER_SEARCH_RESULT';
const SET_ACCESS_ORDER_LIST = 'SET_ACCESS_ORDER_LIST';
const SELECT_ADDRESS = 'SELECT_ADDRESS';

export default {
    getOrderSearchList(orderList){
        return {
            type:ORDER_SEARCH_RESULT,
            payload:{orderList}
        }
    },
    setOrderList(accessList){
        return{
            type:SET_ACCESS_ORDER_LIST,
            payload:{accessList}
        }
    },
    setAddress(addressMessage){
        return{
            type:SELECT_ADDRESS,
            payload:{addressMessage}
        }
    }
}