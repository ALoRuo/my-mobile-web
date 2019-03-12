import API from 'utils/API';
import axiosHttp from 'utils/axiosHttp'
export default {
    //mock数据
    test(param){
        // return axiosHttp.get('http://120.78.200.79:9990/productCategory/list/0', param);
        return axiosHttp.post('http://120.78.200.79:9990/user/register', param,'json');
    }
}
