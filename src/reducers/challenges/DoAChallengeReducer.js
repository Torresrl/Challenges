import {COMMENT_CHANGE,
    DO_CHALLENG_ADD_IMAGE,
    DO_CHALLENGE_TIMELINE_FETCH,
    NO_IMAGE_ADDED
} from '../../Actions/types';

const INITIAL_STATE = {
    image: null,
    comment: "",
    timeline: {},
    error: "",
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case COMMENT_CHANGE:
            return {...state, comment: action.payload};
        case DO_CHALLENG_ADD_IMAGE:
            return{...state, image: action.payload, error: ""};
        case DO_CHALLENGE_TIMELINE_FETCH:
            return {...state, timeline: action.payload};
        case NO_IMAGE_ADDED:
            return {...state, error: "You need to add a image"};
        default:
            return state;
    }
}