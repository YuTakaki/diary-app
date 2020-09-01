import React, {useState, useEffect} from 'react';
import '../../styles/css/form.css'
import {openForm} from '../functions/methods';
import axios from 'axios';

const Signup = (props) => {
    const[signupForm, setSignupForm] = useState({
        username : '',
        email : '',
        password : '',
        retry : ''
    });
    const setState = (key, value) => {
        setSignupForm({
            ...signupForm,
            [key]: value
        })
    }
    
    useEffect(()=>{
        // console.log(signupForm)
    })
    const submit = (e) => {
        e.preventDefault();
        axios.post('user/sign-up', {
            username : signupForm.username,
            email : signupForm.email,
            password : signupForm.password,
            retry_password : signupForm.retry
        }).then(res => {
            console.log(res);
            openForm(props, '/');
            
        });
    }
    return ( 
        <div className='form'>
            <form className='sign-up_form' onSubmit={submit}>
                <h1>Create Your Account</h1>
                <div>
                    <input type='text' id='username' value={signupForm.username} onChange={(e)=>setState('username', e.target.value)} placeholder=' '/>
                    <label htmlFor='username'>Username</label>
                </div>
                <div>
                    <input type='text' id='email' value={signupForm.email} onChange={(e)=>setState('email', e.target.value)} placeholder=' '/>
                    <label htmlFor='email'>Email</label>
                </div>
                <div>
                    <input type='password' id='password' value={signupForm.password} onChange={(e)=>setState('password', e.target.value)} placeholder=' '/>
                    <label htmlFor='password'>Password</label>
                </div>
                <div>
                    <input type='password' id='retry' value={signupForm.retry} onChange={(e)=>setState('retry', e.target.value)} placeholder=' '/>
                    <label htmlFor='retry'>Retry Password</label>
                </div>
                <input type='submit'/>
                <span className='exit' onClick={() => openForm(props,'/')}><i className='fa fa-remove'></i></span>
            </form>
        </div>

        
     );
}
 
export default Signup;