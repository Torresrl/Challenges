import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Button, Input, Card, CardSection} from './common';
import {Actions} from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';




class newChallenges extends Component {



    //Denne kobles opp i router
    static renderRightButton = () =>{
        return(
            <Button style={styles.styleAddButton} onPress={ () => {Actions.newChallenges()}}>
                +
            </Button>
        );
    };

    chooseImage() {

        ImagePicker.showImagePicker(null, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    avatarSource: source
                });
            }
        });





    }

    render() {

        const {styleFirstCard} = styles;

        return(

            <View>
                <Card style={styleFirstCard}>
                    <CardSection>
                        <Button onPress={() => {this.chooseImage()}}>
                            Add Picture
                        </Button>
                    </CardSection>
                </Card>

                <Card>
                    <CardSection>
                        <Input
                            label="name"
                            placeholder ="summer challenges"
                        />

                    </CardSection>
                    <CardSection>
                        <Input
                            label="Description"
                            placeholder="Description"
                        />
                    </CardSection>
                </Card>
            </View>
        );
    }
}

styles = {
    styleAddButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },


    styleFirstCard: {
        marginTop: 70
    },

};

export default newChallenges;