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
    DEL_ALL_PRODUCTS:prefixed+'cart/delCart',
    //新增收货地址
    USER_UPDATE:prefixed+'user/update',
    //获取所有收货地址
    RECEIVER_INFO: prefixed+'user/ReceiverInfo',
    //获取单独一条收货信息
    GET_ONE_RECEIVE_INFO: prefixed+'user/ReceiverInfoById',
    //修改收货信息
    UPDATE_RECEIVE_INFO: prefixed+'user/UpdateReceiverInfo',
    //删除收货信息
    DELETE_RECEIVE_INFO: prefixed+'user/delete',
    //保存购物信息
    SAVE_ORDER:prefixed+'order/save',
    //生成订单
    ORDER_CREATE:prefixed+'order/create',
    //订单展示列表
    ORDER_LIST:prefixed+'order/list',
    //获取购买信息
    ORDER_GETITEMS: prefixed+'order/getItems'
}
