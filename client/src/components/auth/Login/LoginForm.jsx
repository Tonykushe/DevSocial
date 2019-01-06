import React, { Component } from 'react'
// import classnames from "classnames";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { loginUser } from "../authActions";
import TextInput from '../../../app/common/form/TextInput';

const actions = {
    loginUser
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})




class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }

    onChange = ({ target }) => {
        this.setState({ [target.name]: target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.loginUser(userData)

    }

    render() {

        const { errors } = this.state
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your DevSocial account</p>
                            <form onSubmit={this.onSubmit}>
                                <TextInput 
                                    type="email" 
                                    placeholder="Email Address"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    error={errors.email}
                                />

                                <TextInput
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    error={errors.password}
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


LoginForm.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}


export default connect(mapStateToProps, actions)(LoginForm);
