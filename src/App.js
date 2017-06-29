import React, {Component} from 'react';
import { View} from 'react-native';
//import {Provider} from 'react-redux';
//import {createStore, applyMiddleware} from 'redux';
import firebase from 'firebase';
import Router from './Router';




class App extends Component {

    componentWillMount() {
        var config = {
            apiKey: "AIzaSyAjlvAZ8yEUUJx49W06WNfa0Skt3pzTav4",
            authDomain: "challenges-840a4.firebaseapp.com",
            databaseURL: "https://challenges-840a4.firebaseio.com",
            projectId: "challenges-840a4",
            storageBucket: "challenges-840a4.appspot.com",
            messagingSenderId: "637891220380"
        };
        firebase.initializeApp(config);

    }

    render() {
        //const store = createStore(reducers, {}, applyMiddleware);

        return (
                <Router/>

        );
    }
}

export default App;