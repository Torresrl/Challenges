import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import {COMMENT_CHANGE,
    DO_CHALLENG_ADD_IMAGE,
    DO_CHALLENGE_TIMELINE_FETCH,
    NO_IMAGE_ADDED
} from '../types';

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


//brukes til å oppdatere flere poster samtidig
export const challengDone = (object) => {
    const {currentUser} = firebase.auth();
    const {image, comment, challengeId, challengesId, owner} = object;
    const database = firebase.database();

    if(image != null) {


        let followers = {};
        database
            .ref('/challenges/' + challengesId + '/followers')
            .on('value', (snap) => followers = snap.val());

        let post = {
            comment: comment,
            image: '/challenges/'
            + challengesId + '/'
            + challengeId +
            '/timeline/'
            + currentUser.uid
        };
        let fanoutObj = fanoutPost({
            challengeId: challengeId,
            challengesId: challengesId,
            followersSnapshot: followers,
            post: post,
            owner: owner
        });

        return () => {
            uploadImage(image, challengesId, challengeId);
            database.ref().update(fanoutObj);

        }
    } else {
        return {
            type: NO_IMAGE_ADDED
        };
    }


};

//henter ut en liste men informasjon om hver challenge
export const fetchTimeline = (challengesId, challengeId) => {
    const {currentUser} = firebase.auth();

    return (dispatch) => {
        firebase.database()
            .ref('/Users/' +
                currentUser.uid + '/myChallenges/' +
                challengesId +'/challenges/' +
                challengeId + '/timeline')

            .on('value', snapshot => {
                dispatch({
                    type: DO_CHALLENGE_TIMELINE_FETCH,
                    payload: snapshot.val()
                });
            });
    }

};


const fanoutPost =({challengeId, challengesId, followersSnapshot, post, owner}) => {
    const {currentUser} = firebase.auth();
    // Turn the hash of followers to an array of each id as the string
    //problemt er at me ikke får rett verdi fra followersSnapshot
    let followers = Object.keys(followersSnapshot);
    let fanoutObj = {};

    // write to each follower's timeline
    //denne virker ikke sikkelig!
    followers.forEach((key) => fanoutObj[
        '/Users/' + key +
        '/myChallenges/' + challengesId +
        '/challenges/' + challengeId +
        '/timeline/' + currentUser.uid] = post);


    //legger til challenges som nye personer kopierer til sin egen
    fanoutObj[
        'challenges/'+ challengesId +
        '/challenges/' +challengeId +
        '/timeline/' + currentUser.uid] = post;

    //oppdaterer eieren sin timeline
    fanoutObj[
        '/Users/' + owner +
        '/myChallenges/' + challengesId +
        '/challenges/' +challengeId +
        '/timeline/' + currentUser.uid] = post;

    fanoutObj[
        '/Users/' + currentUser.uid +
        '/myChallenges/' + challengesId +
        '/challenges/' +challengeId + '/done'] = true;

    return fanoutObj;
};

const uploadImage = (image, challengesId, challengeId) => {
    const{currentUser} = firebase.auth();
    // Prepare Blob support
    const polyfill = RNFetchBlob.polyfill;
    const Blob = RNFetchBlob.polyfill.Blob;
    window.XMLHttpRequest = polyfill.XMLHttpRequest;
    window.Blob = polyfill.Blob;


    Blob.build(image, {type: 'image/png;BASE64'})
        .then((blob) => firebase.storage()
        .ref(`/challenges/${challengesId}/${challengeId}/timeline/${currentUser.uid}`)
        .put(blob, {contentType: 'image/png'})
        );
};