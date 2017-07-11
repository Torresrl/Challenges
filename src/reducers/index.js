import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import RegisterReducer from './RegisterReducer';
import NewChallengesReducer from './NewChallengesReducer';
import ChallengesListReducer from './ChallengesListReducer';
import ChallengesReducer from './ChallengesReducer';

export default combineReducers ({
    auth: AuthReducer,
    register: RegisterReducer,
    newChallenges: NewChallengesReducer,
    challengesList: ChallengesListReducer,
    challenges: ChallengesReducer
});