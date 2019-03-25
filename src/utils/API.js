let prefixed = 'http://120.78.200.79:9990/';
export default {
    //登录
    LOGIN:prefixed+'user/login',
    //一级菜单栏
    FIRST_LEVEL_CLASSIFY:prefixed+'productCategory/list/0',
    //二级目录
    SECOND_LEVEL_CLASSIFY:prefixed+'productCategory/list',
    //获取商品列表
    GET_PRODUCT_LIST:prefixed+'product/list',
    //显示购物车
    GET_SHOPPING_CART_LIST:prefixed+'cart/getCartList',
    //加入购物车
    ADD_SHOPPING_CART:prefixed+'cart/add',
    //商品详情
    GET_PRODUCT_DETAIL:prefixed+'product',
    //删除购物车一样商品
    DEL_CART_PRODUCT: prefixed+'cart/delCartProduct',
    //全部删除
    DEL_ALL_PRODUCTS:prefixed+'cart/delCart'
}
