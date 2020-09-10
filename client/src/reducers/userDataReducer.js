export const userDataReducer = (state, action) => {
    switch(action.type){
        case 'GETDATA' : 
            
                return action.user
 
        default : 
            return state
    }
}