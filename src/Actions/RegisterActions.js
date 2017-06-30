import {NEW_EMAIL_CHANGE, NEW_PASSWORD_CHANGE} from './types';

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