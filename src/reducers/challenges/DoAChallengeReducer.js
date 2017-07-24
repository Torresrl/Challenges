import {COMMENT_CHANGE,
    DO_CHALLENG_ADD_IMAGE,
    DO_CHALLENGE_TIMELINE_FETCH
} from '../../Actions/types';

const INITIAL_STATE = {
    image: null,
    comment: "",
    timeline: {}
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case COMMENT_CHANGE:
            return {...state, comment: action.payload};
        case DO_CHALLENG_ADD_IMAGE:
            return{...state, image: action.payload};
        case DO_CHALLENGE_TIMELINE_FETCH:
            return {...state, timeline: action.payload};
        default:
            return state;
    }
}