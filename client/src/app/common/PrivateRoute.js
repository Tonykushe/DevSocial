import React from 'react'
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const mapState = state => ({
    auth: state.auth
})

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route 
        {...rest}
        render = {props => 
            auth.isAuthenticated ? (
                <Component {...props}/>
            ) : (
                <Redirect to="/login"/> 
            )
        }
    />
)
PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

export default connect(mapState)(PrivateRoute)
