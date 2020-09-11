import React from 'react';
import {Link} from 'react-router-dom';
import {openForm} from '../functions/methods';
import {withRouter} from 'react-router-dom';
import {toggleNavBar} from '../functions/methods';


const SignedOutLinks = (props) => {
    return ( 
        <ul className='nav'>
            <Link to='/home-page' onClick={toggleNavBar}><li>Home</li></Link>
            <li className='signinBtn' onClick={() => {
                toggleNavBar();
                setTimeout(()=> {
                    openForm(props, '/log-in'); 
                }, 500)
                }}>Sign-In</li>
        </ul>
     );
}
 
export default withRouter(SignedOutLinks);