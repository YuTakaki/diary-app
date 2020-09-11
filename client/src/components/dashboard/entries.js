import React from 'react';
import '../../styles/css/entries.css';
import {Link} from 'react-router-dom';
import {month} from '../functions/methods'

const Entries = ({diary}) => {

    console.log(diary);
    const date = new Date(diary.date);
    const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const getDate = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
    const hours = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
    const minutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
    return ( 
        <Link to={`/diary/${diary._id}`}>
            <div className='entry' key={diary._id}>
                <div className='titleContent'>
                    
                    <h1>{diary.title}</h1>
                    
                    <p>{day[date.getDay()]}</p>
                    <p className='year'>{date.getFullYear()}</p>
                </div>
                <div className='time'>
                    <p>{hours}:{minutes}</p>
                </div>
                <div className='content'>
                    <h2>{month[date.getMonth()]} {getDate}</h2>
                    <div className='diary-content'>
                        <p>{diary.diary}</p>
                    </div>
                    
                </div>
            </div>

        </Link>
        
     );
}
 
export default Entries;