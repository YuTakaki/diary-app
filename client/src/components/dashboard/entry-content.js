import React ,{useContext, useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom'
import {Auth} from '../../context/authentication';
import '../../styles/css/entryContent.css';
import axios from 'axios';
import {month} from '../functions/methods';
import { User_data } from '../../context/userdata';

const EntryContent = (props) => {
    const {auth} = useContext(Auth);
    const {dispatchUser} = useContext(User_data);
    const [diary, setDiary] = useState({
        title : null,
        date : null,
        diary: []
    });
    useEffect(() => {
        console.log(auth)
        axios.get(`/dashboard/postcontent/user/?user_id=${auth.user_id}&diary_id=${props.match.params.id}`)
            .then(res => {
                console.log(res);
                res.data.diary = res.data.diary.split('\n')
                                    .filter(diary => diary !== '');
                setDiary(res.data);
            });
    }, []);
    useEffect(() => {
        console.log(diary)
    }, [diary]);
    const deleteDiary = () => {
        axios.delete(`/dashboard/post/delete/?user_id=${auth.user_id}&diary_id=${props.match.params.id}`)
            .then(res => {
                dispatchUser({type: 'GETDATA', user: res.data});
                props.history.push('/');
            })
            .catch(err => console.log(err));
    }
    const updateDiary = () => {
        props.history.push(`/update-diary/${props.match.params.id}`)
    }
    const postContent = diary.diary.map((diary, i) => <p className='content' key={i}>{diary}</p>);
    return ( 
        <>
            {!auth.is_login ?(<Redirect to='/home-page' />) : (
                <div className='entryContentContainer'>
                    <article className='entryContent'>
                        <section>
                            <div className='entryContentHeader'>
                                <h1>{diary.title}</h1>
                                <div className='diaryOption'>
                                    <button onClick={deleteDiary}>Delete</button>
                                    <button onClick={updateDiary}>Edit</button>
                                </div>
                            </div>
                            <div className ='entryContentDate'>
                                <p>{month[new Date(diary.date).getMonth()]} {new Date(diary.date).getDate()},{new Date(diary.date).getFullYear()}</p>
                                <p>{new Date(diary.date).getHours()}:{new Date(diary.date).getMinutes()} </p>
                            </div>
                            <div className='diaryContentContainer'>
                                {postContent}
                            </div>
                        </section>
                        
                    </article>
                </div>
            )}
        </>
        
     );
}
 
export default EntryContent;