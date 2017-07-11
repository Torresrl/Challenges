import React, {Component} from 'react';
import {Text} from 'react-native';
import {Card} from '../common';

class ChallengesListItem extends Component {

    render(){
        const {name} = this.props.challenges;

        return (
            <Card style={stylesListItem.cardStyle}>
                <Text>{name}</Text>
            </Card>
        );
    }
}

stylesListItem = {
    cardStyle: {
        marginTop: 5,
        marginBottom: 5,
        paddingLeft: 5,
        height: 30,
        justifyContent: 'center'
    }
};

export default ChallengesListItem;