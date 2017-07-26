import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob';
import {NEW_PROFILE_IMAGE} from '../types';

export const addProfilePic = (picture) => {
  return {
    type: NEW_PROFILE_IMAGE,
  }
}
/*
const uploadProfilePicture( image ){
  const{currentUser} = firebase.auth();

  currentUser.updateProfile({
    photoURL: ""
    }
  ).then(function(){
    console.log("Update successful")
  }, function(){
    console.log("Error happened")
  });
}*/
