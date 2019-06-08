/**
 * Created by dell on 2019/4/17.
 */
import API from 'utils/API';
import axiosHttp from 'utils/axiosHttp'
export default {
    getOrderList(param){
        return axiosHttp.get(API.ORDER_LIST, param);
    },
    getOrderListByName(param){
        return axiosHttp.post(API.ORDER_LIST_BY_NAME,param,'json')
    },
    cancelOrder(param){
        return axiosHttp.post(API.CANCEL_ORDER,param,'json')
    },
    getOrderListByStatus(param){
        return axiosHttp.post(API.ORDER_LIST_BY_STATUS,param,'json')
    },
    submitPic(param){
        return axiosHttp.post(API.SUBMIT_PIC,param,'json')
    },
    submitAccess(param){
        return axiosHttp.post(API.SUMBIT_ACCESS,param,'json')
    },
    completeOrder(param){
        return axiosHttp.post(API.ORDER_COMPLETED,param,'json')
    }
}