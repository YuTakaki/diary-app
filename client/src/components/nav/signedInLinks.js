import React from 'react';
import {Link} from 'react-router-dom';

const SignedInLinks = () => {
    return ( 
        <ul>
            <li><Link to='/'>New Entry</Link></li>
            <li>Log Out</li>
            <li className='logoutBtn'><Link  to='/'>Yu</Link></li>


        </ul>
     );
}
 
export default SignedInLinks;