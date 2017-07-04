import {CHALLENGES_NAME,
        CHALLENGES_DESCRIPTION,
        CHALLENGES_IMAGE,
        ADD_CHALLENGE,
        CHALLENG_NAME,
        CHALLENG_DES
} from './types';


export const nameChange = (text) => {
    return {
        type: CHALLENGES_NAME,
        payload: text
    };
};

export const descriptionChange = (text) => {
    return {
        type: CHALLENGES_DESCRIPTION,
        payload: text
    };
};

export const addImage = (text) => {
    return {
        type: CHALLENGES_IMAGE,
        payload: text

    };
};

export const challengeNameChange = (text) => {
    return {
        type: CHALLENG_NAME,
        payload: text
    };
};

export const challengeDesChange = (text) => {
    return {
        type: CHALLENG_DES,
        payload: text
    };
};

export const addChallenge = (text) => {
    return {
        type: ADD_CHALLENGE,
        payload: text
    };
};
