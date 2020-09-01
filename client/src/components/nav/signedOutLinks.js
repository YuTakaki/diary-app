import React from 'react';
import {Link} from 'react-router-dom';
import {openForm} from '../functions/methods';
import {withRouter} from 'react-router-dom'


const SignedOutLinks = (props) => {
    const closeNav = () => {
        document.querySelector('#check').checked = false;
    }
    return ( 
        <ul>
            <Link to='/' onClick={closeNav}><li>Home</li></Link>
            <Link to='/' onClick={closeNav}><li>About</li></Link>
            <li className='signinBtn' onClick={() => {
                openForm(props, '/log-in'); 
                closeNav();
                }}>Sign-In</li>
        </ul>
     );
}
 
export default withRouter(SignedOutLinks);