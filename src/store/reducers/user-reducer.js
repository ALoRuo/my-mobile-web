/**
 * Created by dell on 2019/4/15.
 */
const initState = {
    userName:'login'
}
export default function(state={}, action) {
    switch (action.type) {
        case 'USER_MESSAGE': {
            return {
                ...state,
                ...action.payload
            }
        }

        default:
            return state;
    }
}