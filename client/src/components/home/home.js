import React, {useContext} from 'react';
import Login from './login';
import Signup from './signup';
import '../../styles/css/home.css';
import girl from '../../assets/girl.png';
import {openForm} from '../functions/methods';
import {Auth} from '../../context/authentication';
import Dashboard from '../dashboard/dahboard'

const Home = (props) => {
    const {auth} = useContext(Auth);
    
    const dashboard = !auth.is_login ? (
        
            <div className='main'>
                <div className='getStarted'>
                    <h1>Create records of your day in one go</h1>
                    <p>Save and Re-read your Records of life with us</p>
                    <button onClick={() => openForm(props,'/sign-up')}>Get Started</button>

                </div>
                <div className='image'>
                    <img src={girl}/>
                </div>
            </div>
        
    ) : (<Dashboard />)
    
    return (  
        <div className='home'>
            {dashboard}

        </div>
        
            
            
        
    );
}
 
export default Home;