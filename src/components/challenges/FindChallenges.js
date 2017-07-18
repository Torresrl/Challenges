import React, {Component} from 'react';
import {Modal, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Input, Button, CardSection} from '../common';

class ChallengesModal extends Component{

    render() {
        const {
            modalContainerStyle,
            inputStyle,
            inputContainerStyle,
            buttonsContainerStyle,
            buttonStyle,
            inputLabelStyle
        } = styles;

        return (

                <View style={modalContainerStyle}>
                    <View style={inputContainerStyle}>
                        <Input
                            placeholder="KpFtz0kg0DNKpZSTugn"
                            label="Code:"
                            style = {inputStyle}
                            labelStyle = {inputLabelStyle}
                        />
                    </View>


                    <CardSection style={buttonsContainerStyle}>
                        <Button style={buttonStyle}>Add</Button>
                    </CardSection>
                </View>


        );
    }
}

const styles = {
    modalContainerStyle: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 80,
        marginBottom: 80,
        backgroundColor: 'white'
    },


    inputContainerStyle: {
        flex: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },

    inputStyle: {
        borderWidth: 1,
        borderColor: "black",
        height: 50,
        flex: 0
    },

    inputLabelStyle: {
        flex: 1
    },

    buttonsContainerStyle: {
        flex: 1,
    },

    buttonStyle: {
        borderWidth: 1
    }

};



export default connect(null) (ChallengesModal);