import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Button} from '../common';
import {Actions} from 'react-native-router-flux';


class Challenges extends Component {
    //Denne kobles opp i router
    static renderRightButton = () =>{
        return(
            <Button style={styles2.styleAddChal} onPress={ () => {Actions.newChallenges()}}>
                +
            </Button>
        );
    };


    render() {
        return(
            <View style={styles2.containerStyle}>
                <Text> Challenges</Text>
            </View>
        );
    }
}

styles2 = {
    containerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    styleAddChal: {
        alignItems: 'center',
        justifyContent: 'center'
    }

};

export default Challenges;