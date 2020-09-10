import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/home/home';
import Navbar from './components/nav/nav';
import AuthProvider from './context/authentication';
import Signup from './components/home/signup';
import Login from './components/home/login';
import Dashboard from './components/dashboard/dahboard'
import UserDataProvider from './context/userdata';
import NewEntry from './components/dashboard/newEntry';
import EntryContent from './components/dashboard/entry-content';
import UpdateDiary from './components/dashboard/updateForm';
import AccountSettings from './components/dashboard/accountsetting';


function App() {
  return (
    <div className="App"> 
      <Router>
        <AuthProvider>
          <UserDataProvider>
            <Navbar />
              <Switch>          
                <Route exact path = '/' component={Dashboard} />
                <Route exact path = '/home-page' component={Home} />
                <Route path = '/sign-up' component={Signup} />
                <Route path = '/log-in' component={Login} />
                <Route path ='/new-entry' component={NewEntry} />
                <Route path ='/update-diary/:id' component={UpdateDiary} />
                <Route path = '/account-setting' component={AccountSettings} />
                <Route path = '/diary/:id' component={EntryContent} />
                
              </Switch>
          </UserDataProvider>
        </AuthProvider>
      </Router>
      

    </div>
  );
}

export default App;
