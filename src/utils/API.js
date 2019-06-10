let prefixed = 'http://120.78.200.79:9990/';
export default {
    //登录
    LOGIN:prefixed+'user/login',
    //注册
    REGISTER:prefixed+'user/register',
    //一级菜单栏
    FIRST_LEVEL_CLASSIFY:prefixed+'productCategory/list/0',
    //二级目录
    SECOND_LEVEL_CLASSIFY:prefixed+'productCategory/list',
    //获取商品列表
    GET_PRODUCT_LIST:prefixed+'product/list',
    //模糊查询获取商品列表
    GET_SIMPLE_PRODUCT_LIST:prefixed+'product/simpleList',
    //显示购物车
    GET_SHOPPING_CART_LIST:prefixed+'cart/getCartList',
    //加入购物车
    ADD_SHOPPING_CART:prefixed+'cart/add',
    //商品详情
    GET_PRODUCT_DETAIL:prefixed+'product/getItem',
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
    ORDER_GETITEMS: prefixed+'order/getItems',
    //根据订单名称搜订单
    ORDER_LIST_BY_NAME: prefixed+'order/listByName',
    //根据订单状态显示订单
    ORDER_LIST_BY_STATUS: prefixed+'order/listByStatus',
    //完成订单支付
    ORDER_PAY: prefixed+'order/pay',
    //确认收货
    ORDER_COMPLETED: prefixed+'order/Completed',
    //删除订单
    CANCEL_ORDER:prefixed+'order/cancel',
    //上传照片
    SUBMIT_PIC:prefixed+'aliyun/oss/upload',
    //发表评论
    SUMBIT_ACCESS:prefixed+'comment/create',
    //根据商品查看评论
    COMMENTS_BY_PRODUCTID: prefixed+'comment/listByProduct',
    //根据评价类型找评论
    COMMENTS_BY_STAR: prefixed+'comment/listByStar',
    //根据图片找评论
    COMMENTS_BY_PIC: prefixed+'comment/listByPics',
    //查看个人评价
    MY_COMMENTS_LIST:prefixed+'comment/list',
    //查看店铺信息
    SHOP_MESSAGE:prefixed+'brand',
    //关注店铺
    COLLECT_SHOP:prefixed+'follow/create',
    //取消关注关注店铺
    CANCEL_COLLECT_SHOP:prefixed+'follow/unfollow',
    //查看关注的店铺
    GET_COLLECT_SHOP_LIST:prefixed+'follow/list',
    //查看店铺商品
    GET_BRAND_PRODUCT:prefixed+'brand/findByBrandId',
    //优质好店
    GOOD_SHOP:prefixed+'home/goodqualitybrand',
    //秒杀专场
    SALE_FLASH:prefixed+'home/getSeckill',
    //设置秒杀时间
    SET_SALE_TIME:prefixed+'refreshCron',
    //新品首发
    NEW_PRODUCT:prefixed+'home/newarrival',
    //广告位投放
    GUANGGAO_HOME:prefixed+'/home/ads'
}
