import React from 'react';
import {Scene, Router} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import NewUser from './components/NewUser';
import Feed from './components/Feed';

const RouterComponent = () => {
    return (


        <Router sceneStyle={{paddingTop: 65}}>
            <Scene key="auth">
                <Scene key="login" component={LoginForm} title="Challenges" />
                <Scene key="newUser" component={NewUser} title="New User"/>
            </Scene>

            <Scene key="main">
                <Scene key="feed" component={Feed} title="Challenges"/>

            </Scene>
        </Router>

    );
};

export default RouterComponent;
