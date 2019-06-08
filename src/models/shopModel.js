/**
 * Created by dell on 2019/4/26.
 */
import API from 'utils/API';
import axiosHttp from 'utils/axiosHttp'
export default {
    getShopMessage(param){
        return axiosHttp.get( `${API.SHOP_MESSAGE}/${param}`);
    },
    collectShop(param){
        return axiosHttp.post(API.COLLECT_SHOP,param,'json');
    },
    cancelCollectShop(param){
        return axiosHttp.post(API.CANCEL_COLLECT_SHOP,param,'json');
    },
    getCollectShopList(param){
        return axiosHttp.post(API.GET_COLLECT_SHOP_LIST,param,'json');
    },
    getBrandProducts(param){
        return axiosHttp.post(API.GET_BRAND_PRODUCT,param,'json')
    }
}