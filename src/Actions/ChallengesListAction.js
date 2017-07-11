import firebase from 'firebase';
import {
    CHALLENGES_FETCH_SUCCESS
} from './types';

export const challengesFetch = () => {
    const {currentUser} = firebase.auth();

    return(dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/challenges/`)
            .on('value', snapshot => {
                dispatch({
                    type: CHALLENGES_FETCH_SUCCESS,
                    payload: snapshot.val()
                });
            });
    };
};