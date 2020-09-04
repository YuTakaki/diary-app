import React, {Suspense, lazy} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/home/home';
import Navbar from './components/nav/nav';
import AuthProvider from './context/authentication';
import Signup from './components/home/signup';
import Login from './components/home/login';
import Dashboard from './components/dashboard/dahboard'
import UserDataProvider from './context/userdata';


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
                <Route path= '/sign-up' component={Signup} />
                <Route path= '/log-in' component={Login} />
              </Switch>
          </UserDataProvider>
        </AuthProvider>
      </Router>
      

    </div>
  );
}

export default App;
