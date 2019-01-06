import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import jwt_decode from 'jwt-decode';
import setAuthToken from './app/utils/setAuthToken';
import { setCurrentUser, logoutUser } from "./components/auth/authActions";
import './index.css';
import App from './app/layout/App';
import store from './app/store/store';
import * as serviceWorker from './serviceWorker';
import { clearCurrentProfile } from './components/profile/profileActions';


const rootEl = document.getElementById('root')

// check for token
if (localStorage.jwtToken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info and expiration
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded))

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        // logout user
        store.dispatch(logoutUser())
        // Clear current profile
        store.dispatch(clearCurrentProfile)
        // Redirect to login
        window.location.href = '/login'
    }
}



ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>
    , rootEl);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
