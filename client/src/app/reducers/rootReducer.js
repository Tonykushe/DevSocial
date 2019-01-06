import { combineReducers } from "redux";
import authReducer from '../../components/auth/authReducer'
import errorReducer from '../../components/errors/errorReducer'
import profileReducer from '../../components/profile/profileReducer'


const rootReducer = combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer
})

export default rootReducer;