import React ,{createContext, useReducer, useEffect}from 'react';
import {userDataReducer} from '../reducers/userDataReducer';
import axios from 'axios';

export const User_data = createContext();

const UserDataProvider = (props) => {
    const [user, dispatchUser] = useReducer(userDataReducer, {username : '',diaries: []});
    useEffect(() => {
        const localStorageAuth = localStorage.getItem('auth');
        if(localStorageAuth){
            const user_id = JSON.parse(localStorageAuth).user_id;
            axios.get(`/dashboard/user/${user_id}`)
                .then(user => {
                    dispatchUser({type : 'GETDATA' , user : user.data});
                })
        }
    },[])
    return ( 
        <User_data.Provider value={{user, dispatchUser}}>
            {props.children}
        </User_data.Provider>
     );
}
 
export default UserDataProvider;