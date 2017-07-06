import {CHALLENGES_NAME,
        CHALLENGES_DESCRIPTION,
        CHALLENGES_IMAGE,
        ADD_CHALLENGE,
        CHALLENG_NAME,
        CHALLENG_DES,
        NOT_VALID_NAME,
        NOT_VALID_DESCRIPTION

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
    if(text.name.length !== undefined) {
        return {
            type: NOT_VALID_NAME
        }
    } else if (text.name.description !== undefined){
        return {
            type: NOT_VALID_DESCRIPTION
        }
    } else {
        return {
            type: ADD_CHALLENGE,
            payload: text
        }
    }

};


