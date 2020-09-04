import React ,{createContext, useReducer, useEffect}from 'react';
import {userDataReducer} from '../reducers/userDataReducer';

export const User_data = createContext();

const UserDataProvider = (props) => {
    const [user, dispatchUser] = useReducer(userDataReducer, {});
    useEffect(() => {
        console.log(user);
    },[user])
    return ( 
        <User_data.Provider value={{user, dispatchUser}}>
            {props.children}
        </User_data.Provider>
     );
}
 
export default UserDataProvider;