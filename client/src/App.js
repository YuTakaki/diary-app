import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/home/home';
import Navbar from './components/nav/nav';
import AuthProvider from './context/authentication';
import Signup from './components/home/signup';
import Login from './components/home/login';


function App() {
  
  return (
    <div className="App">
      
      <Router>
        <AuthProvider>
          <Navbar />
            <Switch>
              <Route exact path = '/' component={Home} />
              <Route path= '/sign-up' component={Signup} />
              <Route path= '/log-in' component={Login} />
            </Switch>
            {/* <Signup /> */}

        </AuthProvider>
          
      </Router>
      

    </div>
  );
}

export default App;
