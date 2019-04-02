import API from 'utils/API';
import axiosHttp from 'utils/axiosHttp'
export default {
    getOrderList(param){
        return axiosHttp.get(API.ORDER_LIST, param);
    }
}
