import React, {Component} from 'react';
import {Text,View, TouchableWithoutFeedback} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Card} from '../common';

class ChallengesListItem extends Component {

    onRowPress(){
        Actions.showChallenges({challenges: this.props.challenges});
    }

    render(){
        const {name} = this.props.challenges;

        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View>
                    <Card style={styles.cardStyle}>
                        <Text>{name}</Text>
                    </Card>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    cardStyle: {
        marginTop: 5,
        marginBottom: 5,
        paddingLeft: 5,
        height: 40,
        justifyContent: 'center'
    }
};

export default ChallengesListItem;