import {CHALLENGES_NAME,
        CHALLENGES_DESCRIPTION,
        CHALLENGES_IMAGE

} from '../Actions/types';

const INITIAL_STATE = {
    nameChallenges: '',
    description: '',
    image: ''
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CHALLENGES_NAME:
            return{...state, nameChallenges: action.payload};
        case CHALLENGES_DESCRIPTION:
            return {...state, description: action.payload};
        case CHALLENGES_IMAGE:
            return {...state, image: action.payload};
        default:
            return state;
    }
}