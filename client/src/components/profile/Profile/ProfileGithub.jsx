import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

class ProfileGithub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientId: '4a089247dd8c5c4cd68d',
            clientSecret: 'fcd765aa8a399d23727c1c78b505d7a59c3ae045',
            count: 5,
            sort: 'created: asc',
            repos: []
        }
    }

    componentDidMount() {
        const { github } = this.props
        const { clientId, clientSecret, count, sort } = this.state
        fetch(`https://api.github.com/users/${github}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
            .then(res => res.json())
            .then(data => {
                this.setState({repos: data})
            }).catch(err => console.log(err))
    }

    render() {
        const { repos } = this.state

        const repoItems = repos.map(repo => (
            <div  key={repo.id} className="card card-body mb-2">
                <div className="row">
                    <div className="col-md-6">
                        <h4>
                            <Link to={repo.html_url} className="text-info" target="_blank">
                                {repo.name}
                            </Link>
                        </h4>
                        <p>{repo.description}</p>
                    </div>
                    <div className="col-md-6">
                        <span className="badge badge-info mr-1">
                            Stars: {repo.stargazers_count}
                        </span>
                        <span className="badge badge-secondary mr-1">
                            Watchers: {repo.watchers_count}
                        </span>
                        <span className="badge badge-success">
                            Forks: {repo.forks_count}
                        </span>
                    </div>
                </div>
            </div>
        ))
        return (
            <div ref = "myRef" >
                <hr />
                <h3 className="mb-4">Latest Github Repos</h3>
                { repoItems }
            </div >
        )
    }
}

ProfileGithub.propTypes = {
    github: PropTypes.string.isRequired
};

export default ProfileGithub
