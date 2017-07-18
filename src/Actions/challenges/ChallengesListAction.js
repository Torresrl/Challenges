import firebase from 'firebase';
import {
    CHALLENGES_FETCH_SUCCESS,
    CHALLENGES_FETCH
} from '../types';

export const challengesFetch = () => {
    const {currentUser} = firebase.auth();

    return(dispatch) => {
        dispatch({
           type: CHALLENGES_FETCH
        });

        firebase.database().ref(`/challenges/`)
            .orderByChild('owner')
            .equalTo(currentUser.uid)
            .on('value', snapshot => {
                dispatch({
                    type: CHALLENGES_FETCH_SUCCESS,
                    payload: snapshot.val()
                });
            });
    };
};