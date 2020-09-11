import React, {useState, useEffect, useContext, memo} from 'react';
import FormFilter from './form-filter';
import '../../styles/css/filter.css';
import FilterDiaries from './filterDiaries';
import axios from 'axios';
import { Auth } from '../../context/authentication';

const Filter = () => {
    const {auth} = useContext(Auth);
    const [filterData, setFilterData] = useState({
        month : '',
        date : '',
        year : '',
    });
    const [filterDiary, setfilterDiary] = useState([]);

    const setData = (key, value )=>{
        setFilterData({
            ...filterData,
            [key] : value
        })
    };
    useEffect(() => {
        let query = `${auth.user_id}/?`;
        const keys = ['month', 'date', 'year'];
        keys.forEach((key, i) => {
            if(filterData[key] !== ''){
                query = query.concat(`${key}=${filterData[key]}`);
                if(filterData[keys[i + 1]] !== '' & i !== 2){
                    query = query.concat('&');
                }
            }
        });
        axios.get(`dashboard/filter/${query}`)
            .then(res => {
                setfilterDiary(res.data);
            })
    }, [filterData]);
    
    const filterDiaries = filterDiary.length === 0 ? (
                            <div>
                                <h2>Filtered Search Here</h2>

                            </div>
                        ) : (
                            filterDiary.map(diary => (<FilterDiaries filterDiary={diary}/>))
                        )
    return ( 
        <>
            <FormFilter setData= {setData}/>
            <div className='filterDiaryContainer'>
                {filterDiaries}
            </div>
        </>
     );
}
 
export default memo(Filter);