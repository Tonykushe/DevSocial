import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../authActions";
import TextInput from "../../../app/common/form/TextInput";



const actions = {
    registerUser
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})




class RegisterForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    onChange = ({ target }) => {
        this.setState({ [target.name]: target.value})
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }
        this.props.registerUser(newUser, this.props.history)
        
    }


    render() {
        const { errors } = this.state
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevSocial account</p>
                            <form onSubmit={this.onSubmit}>
                                <TextInput
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                    error={errors.name}
                                />

                                <TextInput
                                    type="email"
                                    placeholder="Email Address"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    name="email" 
                                    error={errors.email}
                                    info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                                />

                                <TextInput
                                    type="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    name="password"
                                    error={errors.password}
                                />

                                <TextInput
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={this.state.password2}
                                    onChange={this.onChange}
                                    name="password2"
                                    error={errors.password2}
                                />

                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

RegisterForm.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

export default connect(mapStateToProps, actions)(withRouter(RegisterForm));
