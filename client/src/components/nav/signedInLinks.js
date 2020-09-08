import React, {useContext} from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import {Auth} from '../../context/authentication'

const SignedInLinks = (props) => {
    const {auth, dispatch} = useContext(Auth);
    const logOut = () => {
        axios.get('user/log-out')
            .then(res => {
                if(res.data === 'logout'){
                    dispatch({type : 'LOGOUT'});
                    // props.history.push('/home-page');
                }
            });
    }
    return ( 
        <ul>
            <Link to='/new-entry'><li>New Entry</li></Link>
            <li className='profileBtn'>Yu
                <div className='dropdown'>
                    <ul>
                        <li onClick={logOut}>Log out</li>
                    </ul>
                </div>
            </li>
            
        </ul>
     );
}
 
export default withRouter(SignedInLinks);