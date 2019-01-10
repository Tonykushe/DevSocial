import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import ProfilAbout from './ProfileAbout'
import ProfileHeader from './ProfileHeader';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub'
import Spinner from '../../../app/common/Spinner'
import { getProfileByHandle } from "../profileActions";

const actions = {
    getProfileByHandle
}

const mapState = (state) => ({
    profile: state.profile
})


class Profile extends Component {

    componentDidMount() {
        if (this.props.match.params.handle) {
            this.props.getProfileByHandle(this.props.match.params.handle);
        }
    }
    render() {
        return (
        <div>
            
        </div>
        )
    }
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired
}

export default connect(mapState, actions)(Profile)
