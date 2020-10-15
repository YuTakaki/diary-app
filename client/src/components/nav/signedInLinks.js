import React, {useContext} from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import {Auth} from '../../context/authentication';
import {toggleNavBar} from '../functions/methods';
import {User_data} from '../../context/userdata'

const SignedInLinks = (props) => {
    const {dispatch} = useContext(Auth);
    const {user} = useContext(User_data);
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
            <li className='profileBtn'><span>{user !== undefined ? user.username[0] : null}</span>
                <div className='dropdown'>
                    <ul>
                        <li onClick={logOut}>Log out</li>
                        <Link to='/account-setting'><li>Account Settings</li></Link>
                    </ul>
                </div>
                <i className='fa fa-angle-down down'></i>
            </li>
            
        </ul>
     );
}
 
export default withRouter(SignedInLinks);