
import {CHALLENGES_NAME,
        CHALLENGES_DESCRIPTION,
        CHALLENGES_IMAGE,
        ADD_CHALLENGE,
        CHALLENG_NAME,
        CHALLENG_DES,
        NOT_VALID_NAME,
        NOT_VALID_DESCRIPTION
} from '../Actions/types';

const INITIAL_STATE = {
    nameChallenges: "",
    description: "",
    image: "",
    challengeName: "",
    challengeDes: "",
    challenges: [],
    error: ""
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
        case NOT_VALID_NAME:
            return {...state, error: "Every challenge need a name"};
        case NOT_VALID_DESCRIPTION:
            return {...state, error: "Every challenge need a description"};
        case ADD_CHALLENGE:
            return{...state,
                challenges: [...state.challenges, action.payload],
                challengeName:"",
                challengeDes:"",
                error: ""
            };
        default:
            return state;
    }
}