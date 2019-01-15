import { ADD_POST, GET_POSTS, POST_LOADING } from "./postConstants";
import { GET_ERRORS } from "../errors/errorConstants";
import axios from "axios";

// Add post
export const addPost = (postData) => dispatch => {
    axios.post('/api/posts', postData)
    .then(res => 
            dispatch({
                type: ADD_POST,
                payload: res.data
            })
        ).catch(err => 
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                }) 
            )
}

// Get post
export const getPosts = () => dispatch => {
    axios.get('/api/posts')
        .then(res =>
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        ).catch(err =>
            dispatch({
                type: GET_POSTS,
                payload: null
            })
        )
}

// Set loading state
export const setPostLoading = () => {
    return {
        type: POST_LOADING
    }
}