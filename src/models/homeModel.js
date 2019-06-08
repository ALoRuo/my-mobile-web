/**
 * Created by dell on 2019/5/13.
 */
import API from 'utils/API';
import axiosHttp from 'utils/axiosHttp'
export default {
    getGoodShop(param){
        return axiosHttp.post(API.GOOD_SHOP, param,'json');
    },
    getSaleFlash(param){
        return axiosHttp.post(API.SALE_FLASH, param,'json');
    },
    setSaleFlashTime(param){
        return axiosHttp.get(API.SET_SALE_TIME, param);
    },
    getNewProduct(param){
        return axiosHttp.post(API.NEW_PRODUCT, param,'json');
    },
    getAds(param){
        return axiosHttp.post(API.GUANGGAO_HOME, param,'json');
    },

}