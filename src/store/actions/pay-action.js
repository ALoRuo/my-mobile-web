/**
 * Created by dell on 2019/4/2.
 */
const TOTAL_PRICE = 'TOTAL_PRICE';

export function payAmount(totalPrice) {
    return {
        type: TOTAL_PRICE,
        payload: { totalPrice }
    }
}