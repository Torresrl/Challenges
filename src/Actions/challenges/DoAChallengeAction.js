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
    const {currentUser} = firebase.auth();
    const {image, comment, challengeId, challengesId, owner} = object;
    const database = firebase.database();


    let followers = {};
    database
        .ref(`challenges/${challengesId}/followers`)
        .on('value', (snap) => followers = snap.val());
    let post = {comment: comment,
                image: '/challenges/'
                +challengesId + '/'
                + challengeId+
                '/timeline'
                + currentUser.uid};
    let fanoutObj = fanoutPost({
        challengeId: challengeId,
        challengesId: challengesId,
        followersSnapshot: followers,
        post:post,
        owner: owner
    });

    return (dispatch) => {
        uploadImage(image,challengesId, challengeId );
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


    //legger til challenges som nye personer kopierer til sin egen
    fanoutObj['challenges/'+ challengesId +
    '/challenges/' +challengeId +
    '/timeline/' + currentUser.uid] = post;

    //oppdaterer eieren sin timeline
    fanoutObj[
    '/Users/' + owner +
    '/myChallenges/' + challengesId +
    '/challenges/' +challengeId +
    '/timeline/' + currentUser.uid] = post;

    return fanoutObj;
};

const uploadImage = (image, challengesId, challengeId) => {
    const{currentUser} = firebase.auth();

    // Prepare Blob support
    const polyfill = RNFetchBlob.polyfill;
    const Blob = RNFetchBlob.polyfill.Blob;
    window.XMLHttpRequest = polyfill.XMLHttpRequest;
    window.Blob = polyfill.Blob;

    console.log('Se her: ' + challengesId);
    console.log('Se her: ' + challengeId);


    Blob.build(image, {type: 'image/png;BASE64'})
        .then((blob) => firebase.storage()
        .ref(`/challenges/${challengesId}/${challengeId}/timeline/${currentUser.uid}`)
        .put(blob, {contentType: 'image/png'})
        );
};