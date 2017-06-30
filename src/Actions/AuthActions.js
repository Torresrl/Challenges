import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {EMAIL_CHANGE,
    PASSWORD_CHANGE,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    TRY_LOGIN
} from './types';


export const emailChange = (text) => {
    return {
        type: EMAIL_CHANGE,
        payload: text
    };
};

export const passwordChange = (text) => {
    return{
        type: PASSWORD_CHANGE,
        payload: text
    };
};

export const loginUser = ({email, password}) => {
    return (dispatch) => {

        dispatch ({
            type: TRY_LOGIN
        });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => loginSuccess(dispatch, user))
            .catch(() => loginFail(dispatch))
    };
};

const loginSuccess = (dispatch, user) => {
    dispatch ({
        type: LOGIN_SUCCESS
    });
    Actions.main();

};

const loginFail = (dispatch) => {
    dispatch ({
        type: LOGIN_FAIL
        });

};

