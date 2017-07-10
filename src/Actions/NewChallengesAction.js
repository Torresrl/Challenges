import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob';
import {Platform} from 'react-native';

import {CHALLENGES_NAME,
        CHALLENGES_DESCRIPTION,
        CHALLENGES_IMAGE,
        CHALLENGES_NAME_NOT_VALID,
        CHALLENGES_DESCRIPTION_NOT_VALID,
        TRY_ADD_CHALLENGES,
        ADD_CHALLENGE,
        CHALLENG_NAME,
        CHALLENG_DES,
        NOT_VALID_NAME,
        NOT_VALID_DESCRIPTION,
        CHALLENGES_CREATED
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
    if(text.name.length == null || text.name.length === 0) {
        return {
            type: NOT_VALID_NAME
        }
    } else if (text.description.length == null || text.description.length === 0){
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

export const addChallenges = ({name, description, image, challenges}) => {
    const {currentUser} = firebase.auth();


    // Prepare Blob support
    const polyfill = RNFetchBlob.polyfill;
    const Blob = RNFetchBlob.polyfill.Blob;

    window.XMLHttpRequest = polyfill.XMLHttpRequest;
    window.Blob = polyfill.Blob;

    if(name.length == null || name.length === 0){
        return {
            type: CHALLENGES_NAME_NOT_VALID
        }
    } else if(description.length == null || description.length === 0){
        return {
            type: CHALLENGES_DESCRIPTION_NOT_VALID
        }
    }
    //const imageId = firebase().database().ref().push().key;

    //const postKey = firebase.database().ref().child('posts').push().key;
    // const myRef = firebase.database().ref(`/users/${currentUser.uid}/challenge/`)
    //    .push();

    return(dispatch) => {

        dispatch({
               type: TRY_ADD_CHALLENGES
        });

        firebase.database().ref(`/users/${currentUser.uid}/challenge/`)
            .push({name, description, challenges})
            .then(() => {
                Blob.build(image, { type : 'image/png;BASE64' })
                    .then((blob) => firebase.storage()
                        .ref(`/users/${currentUser.uid}/challenges/`)
                        .put(blob, { contentType : 'image/png' })
                    )
                    .then(() => {
                        dispatch({type: CHALLENGES_CREATED});
                        Actions.challenges({type: 'reset'});

                    });



        });
    };
};






