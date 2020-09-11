import React, {useContext} from 'react';
import {Auth} from '../../context/authentication';
import {Redirect} from 'react-router-dom';
import Entries from './entries';
import Filter from './filter';
import '../../styles/css/dashboard.css';
import {User_data} from '../../context/userdata';
import {Link} from 'react-router-dom';

const Dashboard = (props) => {
    const {auth} = useContext(Auth);
    const {user} = useContext(User_data);
    const filterToggle = () => {
        document.querySelector('.filter').classList.toggle('active');
    }
    return (
        <>
            
            <div className='dashboard'>
                
                {!auth.is_login ?(<Redirect to='/home-page' />) : (
                    <>
                    <div className='entries'>
                        <h1 className='entry-title'>Entries</h1>
                        {user.diaries.length > 0 ? 
                            
                        user.diaries.map(diary => (< Entries diary={diary} key={diary._id}/>)) : (
                            <div className='noEntries'>
                                <h2>No Entries yet...</h2>
                                <Link to='/new-entry'><button>New Entry</button></Link>
                            </div>
                        )}
                    </div>
                    <div className='filter'>
                        <Filter />
                    </div>
                    <div className='filterBtn'>
                        <button className='fa fa-filter' onClick={filterToggle}></button>
                    </div>
                    </>
                )}
                
                
            </div>

        </>
            
     );
}
 
export default Dashboard;