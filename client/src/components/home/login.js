import React, {useState, useEffect, useContext} from 'react';
import '../../styles/css/form.css';
import {openForm} from '../functions/methods';
import axios from 'axios';
import {Auth} from '../../context/authentication';
import {User_data} from '../../context/userdata';

const Login = (props) => {
    const [loginForm, setLoginForm] = useState({
        username : '',
        password : ''
    });
    const setState = (key, value) => {
        setLoginForm({
            ...loginForm,
            [key]: value
        })
    }
    useEffect(()=>{
        // console.log(loginForm);
    });
    const {dispatch} = useContext(Auth);
    const {dispatchUser} = useContext(User_data);
    

    const submit = (e) => {
        e.preventDefault();
        axios.post('/user/log-in', {
            username : loginForm.username,
            password : loginForm.password
        }).then(res =>{
            if(!res.data.msg){
                dispatch({type : 'LOGIN', user_id : res.data});
                
                
                axios.get(`/dashboard/user/${res.data}`)
                    .then(user => {
                        dispatchUser({type : 'GETDATA' , user : user.data});
                        props.history.push('/');
                    })
                
                // console.log(res.data)
            }else{
                console.log(res.data);
            }
            
        });
    }
    return (
        <div className='form'>
            <form className='sign-in_form' onSubmit={submit}>
                <h1>Log-in to your Account</h1>
                <div>
                    <input id='username' value={loginForm.username} type='text' onChange={(e) => setState('username', e.target.value)}  placeholder=' '/>
                    <label htmlFor='username'>Username</label>
                </div>
                <div>
                    <input value={loginForm.password} type='password' onChange={(e) => setState('password', e.target.value)}  placeholder=' '/>
                    <label htmlFor='password'>Password</label>
                </div>        
                <input type='submit' />
                <span className='exit' onClick={() => openForm(props,'/')}><i className='fa fa-remove'></i></span>
            </form>
        </div>
      );
}
 
export default Login;