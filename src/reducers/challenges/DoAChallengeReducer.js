import {COMMENT_CHANGE, DO_CHALLENG_ADD_IMAGE} from '../../Actions/types';

const INITIAL_STATE = {
    image: null,
    comment: ""
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case COMMENT_CHANGE:
            return {...state, comment: action.payload};
        case DO_CHALLENG_ADD_IMAGE:
            return{...state, image: action.payload};
        default:
            return state;
    }
}