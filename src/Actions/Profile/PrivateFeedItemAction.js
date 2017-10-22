import firebase from 'firebase';
import {
  RETRIEVE_CHALLANGE,
  RETRIEVE_CHALLANGE_SUCCESS,
  SELECTED_CHALLANGE,
  PROFILE_DETAIL_PRESS
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

export const profileDetailPress = () => {
  return {
    type: PROFILE_DETAIL_PRESS,
    payload: false
  };
};

export const selectChallange = (uid) => {
  return {
    type: SELECTED_CHALLANGE,
    payload: uid
  };
};
