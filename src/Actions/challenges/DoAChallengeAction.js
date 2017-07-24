import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import {COMMENT_CHANGE, DO_CHALLENG_ADD_IMAGE} from '../types';

export const commentChange = (text) => {
    return {
        type: COMMENT_CHANGE,
        payload: text
    };
};

export const addImageChallenge = (image) => {
    return {
        type: DO_CHALLENG_ADD_IMAGE,
        payload: image
    };
};


//Atm er dette et bra eksempel på hvordan men oppdaterer en post
export const challengDone = (object) => {
    const {image, comment, challengeId, challengesId, owner} = object;
    const database = firebase.database();

    /*
    // Prepare Blob support
    const polyfill = RNFetchBlob.polyfill;
    const Blob = RNFetchBlob.polyfill.Blob;
    window.XMLHttpRequest = polyfill.XMLHttpRequest;
    window.Blob = polyfill.Blob;
    */

    let followers = {};
    database
        .ref(`challenges/${challengesId}/followers`)
        .on('value', (snap) => followers = snap.val());
    let post = {comment: comment};
    let fanoutObj = fanoutPost({
        challengeId: challengeId,
        challengesId: challengesId,
        followersSnapshot: followers,
        post:post,
        owner: owner
    });

    return (dispatch) => {
        database.ref().update(fanoutObj); //prøv å få mer av pathen her

    }


};


const fanoutPost =({challengeId, challengesId, followersSnapshot, post, owner}) => {
    const {currentUser} = firebase.auth();
    // Turn the hash of followers to an array of each id as the string
    //problemt er at me ikke får rett verdi fra followersSnapshot
    let followers = Object.keys(followersSnapshot);
    let fanoutObj = {};
    // write to each follower's timeline

    followers.forEach((key) => fanoutObj[
        '/Users/' + key +
        '/myChallenges/' + challengesId +
        '/challenges/' +challengeId +
        '/timeline/' + currentUser.uid] = post);

    fanoutObj['challenges/'+ challengesId +
    '/challenges/' +challengeId +
    '/timeline/' + currentUser.uid] = post;

    fanoutObj[
    '/Users/' + owner +
    '/myChallenges/' + challengesId +
    '/challenges/' +challengeId +
    '/timeline/' + currentUser.uid] = post;

    return fanoutObj;
};