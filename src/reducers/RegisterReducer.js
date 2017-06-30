import {NEW_EMAIL_CHANGE, NEW_PASSWORD_CHANGE} from '../Actions/types';

const INITIAL_STATE = {
    email: "",
    password: ""
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case NEW_EMAIL_CHANGE:
            return {...state, email: action.payload};
        case NEW_PASSWORD_CHANGE:
            return {...state, password: action.payload};
        default:
            return state;
    }
}