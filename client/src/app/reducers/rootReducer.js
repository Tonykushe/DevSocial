import { combineReducers } from "redux";
import authReducer from '../../components/auth/authReducer'
import errorReducer from '../../components/errors/errorReducer'


const rootReducer = combineReducers({
    auth: authReducer,
    errors: errorReducer
})

export default rootReducer;