/**
 * Created by dell on 2019/4/24.
 */
export default function(state={}, action) {
    switch (action.type) {
        case 'GET_COMMENTS_LIST': {
            return {
                ...action.payload
            }
        }

        default:
            return state;
    }
}