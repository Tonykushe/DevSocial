import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import Spinner from '../../../app/common/Spinner';
import { getProfiles } from "../profileActions";

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
                profileItems = <h1>PROFILES HERE</h1>
            } else {
                profileItems = <h1>No profiles found....</h1>
            }
        }
        return (
            <div class="profiles">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h1 class="display-4 text-center">Developer Profiles</h1>
                            <p class="lead text-center">Browse and connect with developers</p>
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
