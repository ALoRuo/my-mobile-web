import API from 'utils/API';
import axiosHttp from 'utils/axiosHttp'
export default {
    getAllReceiveInfo(param){
        return axiosHttp.get(API.RECEIVER_INFO,param)
    },
    createOrder(param){
        return axiosHttp.post(API.ORDER_CREATE,param,'json')
    },
    getBuyItems(param){
        return axiosHttp.post(API.ORDER_GETITEMS,param,'json')
    }
}
