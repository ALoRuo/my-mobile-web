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
        return axiosHttp.post(API.GET_PRODUCT_DETAIL, param,'json');
    },
    //保存购物信息
    saveOrderMessage(param){
        return axiosHttp.post(API.SAVE_ORDER,param,'json')
    },
    //根据商品id查看评论
    getCommentsByProductId(param){
        return axiosHttp.post(API.COMMENTS_BY_PRODUCTID,param,'json')
    },
    //根据评价类型查看评论
    getCommentsByStar(param){
        return axiosHttp.post(API.COMMENTS_BY_STAR,param,'json')
    },
    //根据图片查看评论
    getCommentsByPic(param){
        return axiosHttp.post(API.COMMENTS_BY_PIC,param,'json')
    },
    //模糊查询商品
    getSimpleProductList(param){
        return axiosHttp.get(API.GET_SIMPLE_PRODUCT_LIST, param);
    },
}
