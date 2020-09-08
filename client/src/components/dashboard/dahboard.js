import React, {useContext} from 'react';
import {Auth} from '../../context/authentication';
import {Redirect} from 'react-router-dom';
import Entries from './entries';
import Filter from './filter';
import '../../styles/css/dashboard.css';
import {User_data} from '../../context/userdata';

const Dashboard = (props) => {
    const {auth} = useContext(Auth);
    const {user} = useContext(User_data);
    return (

        <div className='dashboard'>
            {!auth.is_login ?(<Redirect to='/home-page' />) : (
                <>
                <div className='entries'>
                    {user.diaries.length > 0 ? 
                        
                    user.diaries.map(diary => (< Entries diary={diary} key={diary._id}/>)) : (
                        <div className='noEntries'>

                        </div>
                    )}
                </div>
                <div className='filter'>
                    <Filter />
                </div>
                </>
            )}
            
            
        </div>
     );
}
 
export default Dashboard;