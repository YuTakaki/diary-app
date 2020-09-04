import React, {useContext} from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import {Auth} from '../../context/authentication'

const SignedInLinks = (props) => {
    const {dispatch} = useContext(Auth);
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
            <li><Link to='/'>New Entry</Link></li>
            <li className='profileBtn'><Link to='/'>Yu</Link>
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