import API from 'utils/API';
import axiosHttp from 'utils/axiosHttp'
export default {
    //获取购物车列表
    getShoppingCartList(param){
        return axiosHttp.get(API.GET_SHOPPING_CART_LIST, param);
    },
    //加入购物车
    addShoppingCart(param){
        return axiosHttp.post(API.ADD_SHOPPING_CART, param,'json');
    },
}
