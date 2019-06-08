/**
 * Created by dell on 2019/4/24.
 */
const GET_COMMENTS_LIST = 'GET_COMMENTS_LIST';

export default {
    saveComments(result){
        return {
            type:GET_COMMENTS_LIST,
            payload:{...result}
        }
    }
}