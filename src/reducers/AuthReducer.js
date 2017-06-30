import {EMAIL_CHANGE, PASSWORD_CHANGE, CREATE_USER_SUCCESS} from '../Actions/types';

const INITIAL_STATE = {
    email: "",
    password: "",
    user: null
};


export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case EMAIL_CHANGE:
            return {...state, email: action.payload};
        case PASSWORD_CHANGE:
            return {...state, password: action.payload};
        case CREATE_USER_SUCCESS:
            return{...state, ...INITIAL_STATE, user: action.payload};
        default:
            return state;
    }
}
