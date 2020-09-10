import React from 'react';
import {month} from '../functions/methods';
import {Link} from 'react-router-dom';

const FilterDiaries = ({filterDiary}) => {
    const date = new Date(filterDiary.date);
    return (  
        <Link to={`diary/${filterDiary._id}`}>
            <div className='filterDiaries'>
                <h3>{filterDiary.title}</h3>
                <p className='date_filter'>{month[date.getMonth()]} {date.getDate()},{date.getFullYear()}</p>
                <div className='filterDiaries-content'>
                    <p>{filterDiary.diary}</p>
                </div>
            </div>

        </Link>
        
    );
}
 
export default FilterDiaries;