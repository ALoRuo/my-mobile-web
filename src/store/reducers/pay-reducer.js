/**
 * Created by dell on 2019/4/2.
 */
export default function(state={}, action) {
    switch (action.type) {
        case 'TOTAL_PRICE': {
            return {
                ...state,
                ...action.payload
            }
        }

        default:
            return state;
    }
}