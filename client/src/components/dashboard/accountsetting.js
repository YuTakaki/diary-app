import React, {useState, useContext, useEffect} from 'react';
import {Auth} from '../../context/authentication';
import {Redirect} from 'react-router-dom';
import '../../styles/css/accountsettings.css';
import { User_data } from '../../context/userdata';
import axios from 'axios';

const AccountSettings = (props) => {
    const {auth} = useContext(Auth);
    const {user, dispatchUser} = useContext(User_data);
    const [updateForm, setupdateForm] = useState({
        username : '',
        email : ''
    });
    const [updateFormError, setupdateFormError] = useState({});
    useEffect(() => {
        setupdateForm({
            ...user,
            retry : user.password
        });
    }, [user]);
    const setForm = (key, value) => {
        setupdateForm({
            ...updateForm,
            [key] : value
        });
    }
    const submit = (e) => {
        e.preventDefault();
        axios.put(`/dashboard/update-account/${updateForm._id}`,{
            _id: updateForm._id,
            username : updateForm.username,
            email : updateForm.email,
            password : updateForm.password,
            retry_password : updateForm.retry
        }).then(res => {
            console.log(!res.data.msg_username);
            if(Object.keys(res.data).length === 4){
                setupdateFormError(res.data);
            }else{
                dispatchUser({type : 'GETDATA' , user : res.data});
                props.history.push('/');
            }
        });
    }
    return ( 
        <div>
            {!auth.is_login ?(<Redirect to='/home-page' />) : (
                    <>
                    <form className='account-settings-form' onSubmit={submit}>
                        <h1>Update Account</h1>
                        <div>
                            <input type='text' id='username' value={updateForm.username} placeholder=' ' onChange={ e => setForm('username', e.target.value)}/>
                            <label htmlFor='username'>Username</label>
                            <p className='error'>{updateFormError.msg_username}</p>
                        </div>
                        <div>
                            <input type='text' id='email' value={updateForm.email} placeholder=' ' onChange={ e => setForm('email', e.target.value)}/>
                            <label htmlFor='email'>Email</label>
                            <p className='error'>{updateFormError.msg_email}</p>
                        </div>
                        <div>
                            <input type='password' id='password' placeholder=' ' onChange={ e => setForm('password', e.target.value)}/>
                            <label htmlFor='password'>Password</label>
                            <p className='error'>{updateFormError.msg_password}</p>
                        </div>
                        <div>
                            <input type='password' id='retry' placeholder=' ' onChange={ e => setForm('retry', e.target.value)}/>
                            <label htmlFor='retry'>Retry Password</label>
                            <p className='error'>{updateFormError.msg_retry}</p>
                        </div>
                        <input type='submit'/>
                    </form>
                    </>
                )}
            

        </div>
     );
}
 
export default AccountSettings;