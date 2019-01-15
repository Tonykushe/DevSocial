import React, { Component } from "react";
import PostForm from '../PostForm/PostForm'
import PostFeed from './PostFeed';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from '../../../app/common/Spinner';
import { getPosts } from "../postActions";


const actions = {
    getPosts
}

const mapState = (state) => ({
    post: state.post
})


class Posts extends Component {
    render() {
        const { posts, loading } = this.props.post;
        let postContent;

        if (posts === null || loading) {
            postContent = <Spinner />;
        } else {
            postContent = <PostFeed posts={posts} />;
        }
        return (
            <div className="feed">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <PostForm />
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

export default connect(mapState, actions)(Posts);