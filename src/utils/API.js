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
}
