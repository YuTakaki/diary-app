import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import SignedOutLinks from './signedOutLinks';
import '../../styles/css/nav.css'
import SignedInLinks from './signedInLinks';
import {Auth} from '../../context/authentication';
import {toggleNavBar} from '../functions/methods';

const Navbar = () => {
    const {auth} = useContext(Auth);
    const toggleNav = () => {
        toggleNavBar();
    }
    return ( 
        <nav>
            <div className='container'>
                <div className='logo'>
                    <Link to='/' onClick={() => document.querySelector('nav .nav').classList.remove('active')}>Diary</Link>
                </div>
                {auth.is_login ? (<SignedInLinks />) : (<SignedOutLinks /> )} 
                <div className='nav_btn'>
                    <i className='fa fa-bars' onClick={toggleNav}></i>
                </div>  
            </div>
        </nav>
     );
}
 
export default Navbar;