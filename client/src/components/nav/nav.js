import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import SignedOutLinks from './signedOutLinks';
import '../../styles/css/nav.css'
import SignedInLinks from './signedInLinks';
import {Auth} from '../../context/authentication'
const Navbar = () => {
    const {auth} = useContext(Auth);
    console.log(auth);
    return ( 
        <nav>
            <div className='container'>
                <div className='logo'>
                    <Link to='/'>Diary</Link>
                </div>
                <input type='checkbox' id='check' />
                {auth.is_login ? (<SignedInLinks />) : (<SignedOutLinks /> )} 
                <label htmlFor='check'><i className='fa fa-bars'></i></label>  
            </div>
        </nav>
     );
}
 
export default Navbar;