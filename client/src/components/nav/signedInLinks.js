import React, {useContext} from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import {Auth} from '../../context/authentication';
import {toggleNavBar} from '../functions/methods';

const SignedInLinks = (props) => {
    const {dispatch} = useContext(Auth);
    const logOut = () => {
        axios.get('/user/log-out')
            .then(res => {
                if(res.data === 'logout'){
                    dispatch({type : 'LOGOUT'});
                    // props.history.push('/home-page');
                    localStorage.clear();
                }
            });
    }
    return ( 
        <ul className='nav'>
            <Link to='/new-entry' onClick={toggleNavBar}><li>New Entry</li></Link>
            <li className='profileBtn'>Yu
                <div className='dropdown'>
                    <ul>
                        <li onClick={logOut}>Log out</li>
                        <Link to='/account-setting'><li>Account Settings</li></Link>
                    </ul>
                </div>
            </li>
            
        </ul>
     );
}
 
export default withRouter(SignedInLinks);