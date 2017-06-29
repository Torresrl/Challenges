import React from 'react';
import {Text, View} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';

const RouterComponent = () => {
    return (


        <Router sceneStyle={{paddingTop: 65}}>
            <Scene key="auth">
                <Scene key="login" component={LoginForm} title="Challenges" />
            </Scene>
        </Router>

    );
};

export default RouterComponent;
