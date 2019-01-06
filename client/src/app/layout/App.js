import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Landing from '../../components/layout/Landing';
import LoginForm from '../../components/auth/Login/LoginForm'
import RegisterForm from '../../components/auth/Register/RegisterForm'
import Dashboard from '../../components/profile/Dashboard/Dashboard'

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
                    <Route exact path='/dashboard' component={Dashboard} />
                
                </div>
                <Footer />
            </div>
        </Router>
    );
  }
}

export default App;
