import React, {useContext} from 'react';
import {month} from '../functions/methods';
import {User_data} from '../../context/userdata';

const FormFilter = () => {
    const {user} = useContext(User_data);
    const userDate = new Set([...user.diaries.map(userDate => userDate.date)]);
    console.log(userDate);
    const date = [...Array(31).keys()].map((num,i)=> i+ 1);
    return (
        <form className='formFilter'>
            <select className='form_month' name='month' placeholder='month'>
                <option defaultValue='' disabled>Month</option>
                {month.map((month, i) => (<option value={month} key={i}>{month}</option>))}
            </select>
            <select className='form_date' name='date'>
                <option disabled defaultValue=''>Date</option>
                {date.map((date, i) => <option value={date} key={i}>{date}</option>)}
            </select>
            <input type='number'></input>
            <input type='submit' />

        </form>
        
      );
}
 
export default FormFilter;