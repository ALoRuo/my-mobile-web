import API from 'utils/API';
import axiosHttp from 'utils/axiosHttp'
export default {
    //获取一级菜单栏数据
    getFirstLevel(param){
        // return axiosHttp.get('http://120.78.200.79:9990/productCategory/list/0', param);
        return axiosHttp.get(API.FIRST_LEVEL_CLASSIFY, param);
    },
    //获取二级目录
    getSecondLevel(flag,param){
        return axiosHttp.get(`${API.SECOND_LEVEL_CLASSIFY}/${flag}`, param);
    },
    //获取商品列表
    getProductList(param){
        return axiosHttp.get(API.GET_PRODUCT_LIST, param);
    },
    //获取商品详情
    getProductDetail(param){
        return axiosHttp.get(API.GET_PRODUCT_DETAIL, param,'json');
    }
}
