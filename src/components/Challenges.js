import React, {Component} from 'react';
import {View, Text} from 'react-native';


class Challenges extends Component {
    render() {
        return(
            <View style={styles.containerStyle}>
                <Text> Challenges</Text>
            </View>
        );
    }
}

styles = {
    containerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }

};

export default Challenges;