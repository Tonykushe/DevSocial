import React, { Component } from 'react'
import { NavLink, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import { logoutUser } from "../auth/authActions";
import { clearCurrentProfile } from "../profile/profileActions";


const actions = {
    logoutUser,
    clearCurrentProfile
}

const mapState = (state) => ({
    auth: state.auth
})


class Navbar extends Component {

    onLogout = (e) => {
        e.preventDefault();
        this.props.clearCurrentProfile()
        this.props.logoutUser()
    }

    render() {
        const { isAuthenticated, user } = this.props.auth

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                </li>
                <li className="nav-item">
                    <a href="" onClick={this.onLogout} className="nav-link">
                        <img 
                            className="rounded-circle"
                            src={user.avatar} 
                            alt={user.name} 
                            style={{ width: '25px', marginRight: '5px' }}
                            title="You need a Gravatar email to display an image"
                        />
                        Logout
                    </a>
                </li>
            </ul>
        )

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/register">Sign Up</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
            </ul>
        )




        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">DevSocial</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/profiles"> Developers
                                </NavLink>
                            </li> 
                        </ul>
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </div>
            </nav>
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}



export default connect(mapState, actions)(Navbar)
