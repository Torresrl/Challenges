import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { NEW_PROFILE_IMAGE,
          UPLOAD_PROFILE_PICTURE,
          UPLOAD_PROFILE_PICTURE_FAILED,
          USER_INFO_FETCH_SUCCESS,
          USER_UPDATE,
          USER_UPLOAD_UPDATE_SUCCESS } from '../types';


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

export const saveUserUpdate = (name, email, phone) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    currentUser.updateProfile({
      displayName: name,
      email,
      phoneNumber: phone
    })
    .then(() => {
      dispatch({ type: USER_UPLOAD_UPDATE_SUCCESS });
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


//Maybe consider to make a new action creator for this method. Does that make sense?
export const userInfoFetch = () => {
    const { currentUser } = firebase.auth();

    return {
      type: USER_INFO_FETCH_SUCCESS,
      payload: currentUser
  };
};
