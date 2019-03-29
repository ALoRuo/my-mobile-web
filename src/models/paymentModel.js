import API from 'utils/API';
import axiosHttp from 'utils/axiosHttp'
export default {
    getAllReceiveInfo(param){
        return axiosHttp.get(API.RECEIVER_INFO,param)
    }
}
