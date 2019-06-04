import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'

import store from './store'

import Navbar from './Component/layouts/Navbar';
import Footer from './Component/layouts/Footer';
import Landing from './Component/layouts/Landing';
import './App.css';
import Register from './Component/auth/Register';
import Login from './Component/auth/Login';
import Dashboard from './Component/dahboard/dashboard';
import { clearCurrentProfile } from './actions/profileAction';
import PrivateRoute from './Component/Common/PrivateRoute'
import CreateProfile from './Component/create-profile/CreateProfile'
import EditProfile from './Component/edit-profile/EditProfile'
import AddExperience from './Component/add-credentials/AddExperience'
import AddEducation from './Component/add-credentials/AddEducations'
// check token

if(localStorage.jwtToken){
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info and exp

  const decoded =  jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))
  // check for expired
  const currentTime = Date.now()/1000;

  if(decoded.exp < currentTime){
    // logout user
    store.dispatch(logoutUser());
    // TODO : clear current profile
    store.dispatch(clearCurrentProfile());
    // redirect to login
    window.location.href='/login'

  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
      <Router>
           <div className="App">
              <Navbar/>
    
              <Route exact path='/' component={Landing}/>
                 <div className="container">
                    <Route exact path = "/register" component={ Register }/>
                    <Route exact path = "/login" component={ Login }/>
                    <Switch>
                        <PrivateRoute exact 
                            path = "/dashboard" 
                            component={ Dashboard }
                            />
                    </Switch>
                    <Switch>
                        <PrivateRoute exact 
                            path = "/create-profile" 
                            component={ CreateProfile }
                            />
                    </Switch>
                    <Switch>
                        <PrivateRoute exact 
                            path = "/edit-profile" 
                            component={ EditProfile }
                            />
                    </Switch>
                    <Switch>
                        <PrivateRoute exact 
                            path = "/add-experience" 
                            component={ AddExperience }
                            />
                    </Switch>
                    <Switch>
                        <PrivateRoute exact 
                            path = "/add-education" 
                            component={ AddEducation }
                            />
                    </Switch>
                    
                 </div>
              <Footer/>
            </div>
      </Router>
      </Provider>
     
    );
  }
}

export default App;
