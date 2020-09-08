import React, {useContext} from 'react';
import {month} from '../functions/methods';
import {User_data} from '../../context/userdata';

const FormFilter = ({setData}) => {
    const {user} = useContext(User_data);
    let userDate = new Set([...user.diaries.map(userDate => userDate.date)]);
    userDate = [...userDate];
    userDate = new Set([...userDate.map(year => new Date(year).getFullYear())]);
    userDate = [...userDate];

    const date = [...Array(31).keys()].map((num,i)=> i+ 1);
    return (
        <div className='formFilter'>
            <h1>Filter</h1>
            <div className='filter-form-container'>
                <select onChange={(e) => setData('month', e.target.value)} className='form_month' name='month' placeholder='month'>
                    <option selected value=''>Month</option>
                    {month.map((month, i) => (<option value={month}  key={i}>{month}</option>))}
                </select>
                <select onClick={(e) => setData('date', e.target.value)} className='form_date' name='date'>
                    <option selected value=''>Date</option>
                    {date.map((date, i) => <option value={date} key={i}>{date}</option>)}
                </select>
                {/* <input type='number' min={minYear.toString()} max={maxYear.toString()} placeholder='Year'></input> */}
                <select onClick={(e) => setData('year', e.target.value)} className='form_year' name='year'>
                    <option selected value=''>Year</option>
                    {userDate.map(year => <option value={year}>{year}</option>)}
                </select>
            </div>
        </div>
        
      );
}
 
export default FormFilter;