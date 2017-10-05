import {EMAIL_CHANGE,
    PASSWORD_CHANGE,
    CREATE_USER_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    TRY_LOGIN,
    RE_AUTHENTICATION_SUCCESS,
    RE_AUTHENTICATION_FAIL
} from '../../Actions/types';

const INITIAL_STATE = {
    email: "thomas@isvik.no",
    password: "1234567",
    user: null,
    load: false,
    error: ''
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RE_AUTHENTICATION_FAIL:
          return { ...state, error: 'Something went wrong', load: false };
        case RE_AUTHENTICATION_SUCCESS:
            return { ...state, user: action.payload, load: false };
        case EMAIL_CHANGE:
            return {...state, email: action.payload};
        case PASSWORD_CHANGE:
            return {...state, password: action.payload};
        case CREATE_USER_SUCCESS:
            return{...state, ...INITIAL_STATE, user: action.payload};
        case LOGIN_SUCCESS:
            return {...state, load: false, user: action.payload, password: '' };
        case LOGIN_FAIL:
            return{...state, load: false, password: "",
                error:"email or password is wrong"};
        case TRY_LOGIN:
            return {...state, load: true};
        default:
            return state;
    }
}
