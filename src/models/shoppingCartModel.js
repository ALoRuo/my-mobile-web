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
    //删除购物车某样商品DEL_CART_PRODUCT
    delShoppingCart(param){
        return axiosHttp.post(API.DEL_CART_PRODUCT, param,'json');
    },
    //删除购物车全部商品DEL_ALL_PRODUCTS
    delAllShoppingCart(param){
        return axiosHttp.post(API.DEL_ALL_PRODUCTS, param,'json');
    },
}
