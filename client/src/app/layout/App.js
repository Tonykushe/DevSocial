import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from '../common/PrivateRoute';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Landing from '../../components/layout/Landing';
import LoginForm from '../../components/auth/Login/LoginForm'
import RegisterForm from '../../components/auth/Register/RegisterForm'
import Dashboard from '../../components/profile/Dashboard/Dashboard'
import ProfileForm from '../../components/profile/ProfileForm/ProfileForm'
import EditProfile from '../../components/profile/ProfileActions/EditProfile';
import AddExperience from '../../components/profile/ProfileActions/Experience/AddExperience';
import AddEducation from '../../components/profile/ProfileActions/Education/AddEducation';

class App extends Component {
  render() {
    return (  
        <Router>
            <div className="App">
                <Navbar />
                <Route exact path='/' component={Landing}/>
                <div className="container">
                    <Route exact path='/register' component={RegisterForm} />
                    <Route exact path='/login' component={LoginForm} />
                    <Switch>
                        <PrivateRoute exact path='/dashboard' component={Dashboard} />
                    </Switch>
                    <Switch>
                        <PrivateRoute exact path='/create-profile' component={ProfileForm} />
                    </Switch>
                    <Switch>
                        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
                    </Switch>
                    <Switch>
                        <PrivateRoute exact path='/add-experience' component={AddExperience} />
                    </Switch>
                    <Switch>
                        <PrivateRoute exact path='/add-education' component={AddEducation} />
                    </Switch>
                </div>
                <Footer />
            </div>
        </Router>
    );
  }
}

export default App;
