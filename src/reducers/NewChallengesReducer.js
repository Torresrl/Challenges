
import {CHALLENGES_NAME,
        CHALLENGES_DESCRIPTION,
        CHALLENGES_IMAGE,
        ADD_CHALLENGE,
        CHALLENG_NAME,
        CHALLENG_DES,
            NOT_VALID
} from '../Actions/types';

const INITIAL_STATE = {
    nameChallenges: "",
    description: "",
    image: "",
    challengeName: "",
    challengeDes: "",
    challenges: []
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CHALLENGES_NAME:
            return{...state, nameChallenges: action.payload};
        case CHALLENGES_DESCRIPTION:
            return {...state, description: action.payload};
        case CHALLENGES_IMAGE:
            return {...state, image: action.payload};
        case CHALLENG_NAME:
            return{...state, challengeName: action.payload};
        case CHALLENG_DES:
            return {...state, challengeDes: action.payload};
        case ADD_CHALLENGE:
            return{...state,
                challenges: [...state.challenges, action.payload],
                challengeName:"",
                challengeDes:""
            };
        default:
            return state;
    }
}