import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { NEW_PROFILE_IMAGE,
          UPLOAD_PROFILE_PICTURE,
          UPLOAD_PROFILE_PICTURE_FAILED,
          USER_INFO_FETCH_SUCCESS } from '../types';


export const addProfilePic = (text) => {
  return {
    type: NEW_PROFILE_IMAGE,
    payload: text
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
      payload: [currentUser.photoURL || 'content://com.challenges.provider/app_images/Android/data/com.challenges/files/Pictures/image-7fe7afff-c3bf-4791-8599-86554c471778.jpg', currentUser.displayName]
  };
};
