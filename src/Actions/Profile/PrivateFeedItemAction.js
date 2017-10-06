import firebase from 'firebase';
import {
  RETRIEVE_CHALLANGE,
  RETRIEVE_CHALLANGE_SUCCESS
 } from '../types';

export const retrieveChallange = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({
      type: RETRIEVE_CHALLANGE
    });

    firebase.database().ref(`/Users/${currentUser.uid}/myChallenges`)
    .on('value', snapshot => {
      dispatch({
        type: RETRIEVE_CHALLANGE_SUCCESS,
        payload: snapshot.val()
      });
    });
  };
};
