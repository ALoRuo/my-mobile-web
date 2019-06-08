/**
 * Created by dell on 2019/4/2.
 */
const TOTAL_PRICE = 'TOTAL_PRICE';
const ORDER_ID = 'ORDER_ID';

// export function payAmount(totalPrice) {
//     return {
//         type: TOTAL_PRICE,
//         payload: { totalPrice }
//     }
// }

export default {
    payAmount(totalPrice){
        return {
            type: TOTAL_PRICE,
            payload: { totalPrice }
        }
    },
    getOrderId(orderId){
        return{
            type:ORDER_ID,
            payload: { orderId }
        }
    }
}