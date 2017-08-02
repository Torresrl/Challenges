import {EMAIL_CHANGE,
    PASSWORD_CHANGE,
    CREATE_USER_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    TRY_LOGIN
} from '../../Actions/types';

const INITIAL_STATE = {
    email: "torres.lande@gmail.com",
    password: "1234567",
    user: null,
    load: false,
    error: ''
};


export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case EMAIL_CHANGE:
            return {...state, email: action.payload};
        case PASSWORD_CHANGE:
            return {...state, password: action.payload};
        case CREATE_USER_SUCCESS:
            return{...state, ...INITIAL_STATE, user: action.payload};
        case LOGIN_SUCCESS:
            return {...state, load: false, user: action.payload};
        case LOGIN_FAIL:
            return{...state, load: false, password: "",
                error:"email or password is wrong"};
        case TRY_LOGIN:
            return {...state, load: true};
        default:
            return state;
    }
}
