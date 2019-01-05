import isEmpty from '../../app/validation/is-empty';
import { SET_CURRENT_USER } from "./authConstants";

const initialState = {
    isAuthenticated: false,
    user: {}
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        default:
            return state;
    }
}

export default authReducer;