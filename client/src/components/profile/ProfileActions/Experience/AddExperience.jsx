import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import TextInput from "../../../../app/common/form/TextInput";
import TextArea from "../../../../app/common/form/TextArea";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

const mapState = (state) => ({
    profile: state.profile,
    errors: state.errors
})

class AddExperience extends Component {

    constructor(props) {
        super(props);
        this.state = {
            company: '',
            title: '',
            location: '',
            from: '',
            to: '',
            current: false,
            description: '',
            disabled: false,
            errors: {}
        }
    }

    onChange = ({ target }) => {
        this.setState({ [target.name]: target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log('Submit');
        
    }

    onCheck = (e) => {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        })
    }



    render() {
        const { errors } = this.state
        return (
            <div className="add-experience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">Add Your Experience</h1>
                            <p className="lead text-center">Add any developer/programming positions that you have had in the past or current</p>
                            <small className="d-block pb-3">* = required field</small>
                            <form onSubmit={this.onSubmit}>
                                <TextInput
                                    placeholder="* Company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                />
                                <TextInput
                                    placeholder="* Job Title"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChange}
                                    error={errors.title}
                                />
                                <TextInput
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.company}
                                />
                                <h6>From Date</h6>
                                <TextInput
                                    type="date"
                                    name="from"
                                    value={this.state.from}
                                    onChange={this.onChange}
                                    error={errors.from}
                                />
                                <h6>To Date</h6>
                                <TextInput
                                    name="to"
                                    type="date"
                                    value={this.state.to}
                                    onChange={this.onChange}
                                    error={errors.to}
                                    disabled={this.state.disabled ? 'disabled' : ''}
                                />
                                <div className="form-check mb-4">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="current"
                                        value={this.state.current}
                                        checked={this.state.current}
                                        onChange={this.onCheck}
                                        id="current"
                                    />
                                    <label htmlFor="current" className="form-check-label">
                                        Current Job
                                    </label>
                                </div>
                                <TextArea 
                                    placeholder="Job Description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    error={errors.description}
                                    info="Tell us about yourself"
                                />
                                <input 
                                    type="submit"
                                    value="submit"
                                    className="btn btn-info btn-block mt-4"
                                />
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddExperience.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

export default connect(mapState)(withRouter(AddExperience))
