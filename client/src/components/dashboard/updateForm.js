import React, {useContext, useEffect, useState} from 'react';
import { Auth } from '../../context/authentication';
import { User_data } from '../../context/userdata';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import DiaryForm from '../dashboard/diaryForm';



const UpdateDiary = (props) => {
    const {auth} = useContext(Auth);
    const {dispatchUser} = useContext(User_data);
    const [newDiary, setnewDiary] = useState({
        title : '',
        diary : '',
    })

    const updateEntry = (e) => {
        e.preventDefault();
        axios.post(`/dashboard/add-entry/${auth.user_id}`, {title: newDiary.title, diary: newDiary.content})
            .then(res => {
                dispatchUser({type: 'GETDATA', user: res.data});
                props.history.push('/');
            });
    }
    const setDiary = (e, key) => {
        setnewDiary({
            ...newDiary,
        [key] : e
        });
    }
    useEffect(()=>{
        axios.get(`/dashboard/postcontent/user/?user_id=${auth.user_id}&diary_id=${props.match.params.id}`)
            .then(res => {
                console.log(res);
                setnewDiary(res.data);
            });
    },[])
    return ( 
        <>
            {!auth.is_login ?(<Redirect to='/home-page' />) : (
                <div className='entryFormContainer'>
                    {/* <form onSubmit={addEntry}>
                        <label htmlFor='title'>Title</label>
                        <input id='title' type='text' value={newDiary.title} onChange={(e) => setDiary(e.target.value, 'title')}/>
                        <label htmlFor='content'>Content</label>
                        <textarea id='content' name='content' value={newDiary.content} onChange={(e) => setDiary(e.target.value, 'content')}></textarea>
                        <input type='submit' />
                    </form> */}
                    <DiaryForm addEntry={updateEntry} newDiary={newDiary} setDiary={setDiary}/>
                </div>
            )}
        </>
     );
}
 
export default UpdateDiary;