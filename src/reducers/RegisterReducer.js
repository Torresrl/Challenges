import {NEW_EMAIL_CHANGE,
    NEW_PASSWORD_CHANGE,
    CREATE_USER,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
    WEAK_PASSWORD

} from '../Actions/types';

const INITIAL_STATE = {
    email: "",
    password: "",
    load: false,
    error: ""
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case NEW_EMAIL_CHANGE:
            return {...state, email: action.payload};
        case NEW_PASSWORD_CHANGE:
            return {...state, password: action.payload};
        case CREATE_USER:
            return {...state, load: true};
        case CREATE_USER_SUCCESS:
            return INITIAL_STATE;
        case CREATE_USER_FAIL:
            return {...state, password: "", error: "couldn't create user"};
        case WEAK_PASSWORD:
            return {...state, password: "",
                error: "Your password need to be 7 characters or more."}
        default:
            return state;
    }
}