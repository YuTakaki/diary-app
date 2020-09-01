import React from 'react';
import Login from './login';
import Signup from './signup';
import '../../styles/css/home.css';
import girl from '../../assets/girl.png';
import {openForm} from '../functions/methods';

const Home = (props) => {
    
    return (  
        <div className='home'>
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
            {/* <div className='form'>
                <Signup />
                <Login />
            </div> */}
            
        </div>
    );
}
 
export default Home;