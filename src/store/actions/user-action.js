/**
 * Created by dell on 2019/4/15.
 */
const USER_MESSAGE = 'USER_MESSAGE';

export default {
    login(user){
        return {
            type:USER_MESSAGE,
            payload:{...user}
        }
    }
}