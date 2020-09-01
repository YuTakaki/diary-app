export const authReducers = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            return{
                is_login : true,
                user_id : action.user_id
            }
        default:
            return state
    }
}