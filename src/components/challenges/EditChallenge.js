import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import {Card, CardSection, Input, Button} from '../common';
import {
    challengeNameChange,
    challengeDesChange,
    addChallenge
}from '../../Actions';

class EditChallenge extends Component{

    constructor(props) {
        super(props);

    }

    onChalNameChang(text){
        this.props.challengeNameChange(text);

    }

    onChalDesChang(text){
        this.props.challengeDesChange(text);

    }


    onAddChallenge(){
        const {challengeName, challengeDes} = this.props;
        this.props.addChallenge({name: challengeName, description: challengeDes});


    }

    render() {
        const {styleButtonCard, styleAddButton, errorTextStyle} = stylesEditChal;
        const {challengeName, challengeDes, error} = this.props;

        return (
            <View>
                <Card>
                    <CardSection>
                        <Input
                            label="Challenge"
                            placeholder ="Name"
                            onChangeText={this.onChalNameChang.bind(this)}
                            value={challengeName}
                        />

                    </CardSection>
                    <CardSection>
                        <Input
                            label="Description"
                            placeholder="Description"
                            onChangeText={this.onChalDesChang.bind(this)}
                            value={challengeDes}
                        />
                    </CardSection>
                </Card>

                <Text style={errorTextStyle}>{error}</Text>

                <Card style={styleButtonCard}>
                    <Button
                        style={styleAddButton}
                        onPress={() =>{this.onAddChallenge()}}
                    >
                        {this.props.button1}
                    </Button>
                    <Button style={styleAddButton}>
                        {this.props.button2}
                    </Button>
                </Card>


            </View>
        );
    }
}

stylesEditChal = {
    styleAddButton: {
        borderWidth: 1
    },


    styleButtonCard: {
        borderWidth: 0,
        shadowColor: '#FFF',
        flexDirection: 'row',
        marginBottom: 70
    },
    errorTextStyle: {
        color: 'red',
        fontSize: 12,
        alignSelf: 'center'
    },


};

const mapStateToProps = ({newChallenges}) =>{
    const {nameChallenges, description, image, challengeName, challengeDes, error} = newChallenges;
    return {nameChallenges, description, image, challengeName, challengeDes, error};

};

export default connect(mapStateToProps, {
    challengeNameChange,
    challengeDesChange,
    addChallenge,
})(EditChallenge);