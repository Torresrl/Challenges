import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import RegisterReducer from './RegisterReducer';
import NewChallengesReducer from './NewChallengesReducer';

export default combineReducers ({
    auth: AuthReducer,
    register: RegisterReducer,
    newChallenges: NewChallengesReducer,
});