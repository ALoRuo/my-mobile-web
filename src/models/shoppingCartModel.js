import API from 'utils/API';
import axiosHttp from 'utils/axiosHttp'
export default {
    //mock数据
    test(param){
        return axiosHttp.get(API.TEST, param);
    }
}
