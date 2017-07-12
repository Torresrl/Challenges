import firebase from 'firebase';
import {
    CHALLENGES_FETCH_IMAGE_SUCCESS,
    CHALLENGES_FETCH_IMAGE
} from './types';



export const getImage = (imageId) => {
    const {currentUser} = firebase.auth();

    const storage = firebase.storage()
        .ref(`/users/${currentUser.uid}/challenges/${imageId}`);

    return (dispatch) => {
        dispatch({
            type: CHALLENGES_FETCH_IMAGE
        });

        storage.getDownloadURL().then((url) => {
            dispatch({
                type: CHALLENGES_FETCH_IMAGE_SUCCESS,
                payload: url
            })

        });
    }
};