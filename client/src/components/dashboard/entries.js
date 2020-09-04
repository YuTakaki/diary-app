import React from 'react';
import '../../styles/css/entries.css';
import {month} from '../functions/methods'

const Entries = ({diary}) => {

    console.log(diary);
    const date = new Date(diary.date);
    const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const getDate = date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`;
    const hours = date.getHours() > 10 ? date.getHours() : `0${date.getHours()}`;
    const minutes = date.getMinutes() > 10 ? date.getMinutes() : `0${date.getMinutes()}`;
    return ( 
        <div className='entry' key={diary._id}>
            <div className='date'>
                <h1>{month[date.getMonth()]} {getDate}</h1>
                <p>{day[date.getDay()]}</p>
                <p className='year'>{date.getFullYear()}</p>
            </div>
            <div className='time'>
                <p>{hours}:{minutes}</p>
            </div>
            <div className='content'>
                <h1>Title</h1>
                <p>Non labore fugiat sunt ullamco aute excepteur dolor. Quis ad ipsum elit laboris ea sint est excepteur. Nulla magna consectetur Lorem commodo ex veniam adipisicing ullamco officia. Pariatur aliqua nulla labore sint exercitation commodo. Adipisicing dolore cillum nisi cupidatat sit nostrud qui aute ex aute consequat ullamco adipisicing et. Et cupidatat ut velit id minim magna nisi duis laborum esse commodo.</p>
            </div>
        </div>
     );
}
 
export default Entries;