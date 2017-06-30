import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {NEW_EMAIL_CHANGE,
    NEW_PASSWORD_CHANGE,
    CREATE_USER,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
    WEAK_PASSWORD
} from './types';

export const newEmailChange = (text) => {
    return {
        type: NEW_EMAIL_CHANGE,
        payload: text
    };
};


export const newPasswordChange = (text) => {
    return {
        type: NEW_PASSWORD_CHANGE,
        payload: text
    };
};

export const createUser = ({email, password}) => {
    if(password.length < 7){
        return {
            type: WEAK_PASSWORD
        };
    }


    return (dispatch) => {
        dispatch({type: CREATE_USER});

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => createUserSuccess(dispatch, user))
            .catch(() => createUserFail(dispatch));
    };
};

const createUserSuccess = (dispatch, user) => {
    dispatch({
        type: CREATE_USER_SUCCESS,
        payload: user
    });

    Actions.main({type: 'reset'});
};


const createUserFail = (dispatch) => {
    dispatch({
        type: CREATE_USER_FAIL
    });
};