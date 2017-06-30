import React from 'react';
import {Scene, Router} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import NewUser from './components/NewUser';

const RouterComponent = () => {
    return (


        <Router sceneStyle={{paddingTop: 65}}>
            <Scene key="auth">
                <Scene key="login" component={LoginForm} title="Challenges" />
                <Scene key="newUser" component={NewUser} title="New User"/>
            </Scene>
        </Router>

    );
};

export default RouterComponent;
