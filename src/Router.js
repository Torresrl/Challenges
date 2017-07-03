import React from 'react';
import {Scene, Router} from 'react-native-router-flux';
import {Text} from 'react-native';
import LoginForm from './components/LoginForm';
import NewUser from './components/NewUser';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Challenges from './components/Challenges';
import newChallenges from './components/newChalenges';

const RouterComponent = () => {

    const TabIcon = ({ title }) => {
        return (
            <Text style={{color:'black'}}>{title}</Text>
        );
    };



    return (

        <Router>
            <Scene key="root">
                {/* Scenene for Login*/}
                <Scene key="auth">
                    <Scene key="login" component={LoginForm} title="Challenges" />
                    <Scene key="newUser" component={NewUser} title="New User"/>
                </Scene>

                {/* Scenene for for allt innhold etter innloging*/}
                <Scene key="main" tabs tabBarStyle={styles.tabBarStyle}>
                    <Scene key="tabFeed" title="Home" icon={TabIcon}>
                        <Scene key="feed"
                               component={Feed}
                               title="Home"
                                />
                    </Scene>
                    <Scene key="tabChallenges"
                           title="C"
                           icon={TabIcon}
                    >
                        <Scene
                            key="challenges"
                            component={Challenges}
                            title="Challenges"
                            renderRightButton={newChallenges.renderRightButton}
                        />
                        <Scene
                            key="newChallenges"
                            component={newChallenges}
                            title="New Challenges"
                        />
                    </Scene>
                    <Scene key="tabProfile" title="Profile" icon={TabIcon}>
                        <Scene
                            key="profile"
                            component={Profile}
                            title="Profile"
                        />
                    </Scene>

                </Scene>
            </Scene>
        </Router>

    );
};

let styles = {
    tabBarStyle: {
        backgroundColor: '#EDECF0',
        borderColor: '#B0B0B4',
        borderTopWidth: 1
    }
};

export default RouterComponent;
