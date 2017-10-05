import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { NEW_PROFILE_IMAGE,
          UPLOAD_PROFILE_PICTURE,
          UPLOAD_PROFILE_PICTURE_FAILED,
          USER_INFO_FETCH_SUCCESS,
          USER_UPDATE,
          USER_UPLOAD_UPDATE_SUCCESS,
          INVALID_NAME,
          INVALID_NUMBER } from '../types';


export const addProfilePic = (text) => {
  return {
    type: NEW_PROFILE_IMAGE,
    payload: text
  };
};

export const userUpdate = ({ prop, value }) => {
  return {
    type: USER_UPDATE,
    payload: { prop, value }
  };
};


export const saveUserUpdate = ({ displayName, phoneNumber }) => {
  const { currentUser } = firebase.auth();

  if (phoneNumber == null || phoneNumber.length < 7) {
    return {
      type: INVALID_NUMBER
    };
  } else if (displayName == null || displayName.length < 2) {
    return {
      type: INVALID_NAME
    };
  }

  return (dispatch) => {
    currentUser.updateProfile({
      displayName,
      phoneNumber
    })
    .then(() => {
      dispatch({
        type: USER_UPLOAD_UPDATE_SUCCESS,
        payload: [displayName, phoneNumber]
      });
    })
    .then(Actions.profile({ type: 'reset' }));
  };
};

export const uploadProfilePicture = (uri) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    currentUser.updateProfile({
      photoURL: uri
    })
    .catch(() => {
      dispatch({ type: UPLOAD_PROFILE_PICTURE_FAILED });
    })
    .then(() => {
      dispatch({ type: UPLOAD_PROFILE_PICTURE, payload: uri });
    })
    .then(console.log('Upload profile picture successfully'))
    .then(Actions.main({ type: 'reset' }));
  };
};

export const uploadUpdateProfilePicture = (uri) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    currentUser.updateProfile({
      photoURL: uri
    })
    .catch(() => {
      dispatch({ type: UPLOAD_PROFILE_PICTURE_FAILED });
    })
    .then(() => {
      dispatch({ type: UPLOAD_PROFILE_PICTURE, payload: uri });
    })
    .then(console.log('Upload profile picture successfully'))
    .then(() => {
      dispatch({ type: USER_INFO_FETCH_SUCCESS, payload: currentUser });
    })
    .then(Actions.profile({ type: 'reset' }));
  };
};

export const userInfoFetch = () => {
    const { currentUser } = firebase.auth();

    return {
      type: USER_INFO_FETCH_SUCCESS,
      payload: currentUser
  };
};
