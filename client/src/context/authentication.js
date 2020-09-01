import React, {createContext, useReducer, useEffect} from 'react';
import {authReducers} from '../reducers/authReducers'

export const Auth = createContext();
const AuthProvider = (props) => {
    const [auth, dispatch] = useReducer(authReducers, {
        is_login : false,
        user_id : ''
    });
    useEffect(()=> {
        console.log(auth)
    }, [auth])
    return ( 
        <Auth.Provider value={{auth, dispatch}}>
            {props.children}

        </Auth.Provider>
     );
}
 
export default AuthProvider;