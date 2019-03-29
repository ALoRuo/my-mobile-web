import API from 'utils/API';
import axiosHttp from 'utils/axiosHttp'
export default {
    //mock数据
    login(param){
        // return axiosHttp.get('http://120.78.200.79:9990/productCategory/list/0', param);
        return axiosHttp.post(API.LOGIN, param,'json');
    },
    updateMessage(param){
        // return axiosHttp.get('http://120.78.200.79:9990/productCategory/list/0', param);
        return axiosHttp.post(API.USER_UPDATE, param,'json');
    },
    getAllReceiveInfo(param){
        return axiosHttp.get(API.RECEIVER_INFO,param)
    },
    getOneReceiveInfo(param){
        // return axiosHttp.get(API.GET_ONE_RECEIVE_INFO+`/${param}`)
        return axiosHttp.get(API.GET_ONE_RECEIVE_INFO,param)
    },
    updateReceiveInfo(param){
        return axiosHttp.post(API.UPDATE_RECEIVE_INFO,param,'json')
    },
    deleteReceiveInfo(param){
        return axiosHttp.post(API.DELETE_RECEIVE_INFO,param,'json')
    }

}
