import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import Spinner from '../../../app/common/Spinner';
import { getProfiles } from "../profileActions";
import ProfileItem from "./ProfileItem";

const actions = {
    getProfiles
}

const mapState = (state) => ({
    profile: state.profile
})

class Profiles extends Component {
    componentDidMount() {
        this.props.getProfiles();
    }

    render() {
        const { profiles, loading } = this.props.profile
        let profileItems

        if (profiles === null || loading) {
            profileItems = <Spinner />
        } else {
            if (profiles.length > 0) {
                profileItems = profiles.map(profile => (
                    <ProfileItem key={profile._id} profile={profile} />
                ))
            } else {
                profileItems = <h1>No profiles found....</h1>
            }
        }
        return (
            <div className="profiles">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Developer Profiles</h1>
                            <p className="lead text-center">Browse and connect with developers</p>
                            {profileItems}
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

Profiles.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfiles: PropTypes.func.isRequired
}

export default connect(mapState, actions)(Profiles)
