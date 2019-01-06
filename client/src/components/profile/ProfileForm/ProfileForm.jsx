import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import InputGroup from '../../../app/common/form/InputGroup';

const mapState = (state) => ({
    profile: state.profile,
    errors: state.errors
})

class ProfileForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        }
    }
    render() {
        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Create your profile</h1>
                            <p className="lead text-center">
                                Make it stand out
                            </p>
                            <small className="d-block pb-3">* = required fields</small>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


ProfileForm.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

export default connect(mapState)(ProfileForm)
