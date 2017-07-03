import React, {Component} from 'react';
import {View, Text} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {Button, Input, Card, CardSection} from './common';
import {nameChange, descriptionChange, addImage} from '../Actions';


class NewChallenges extends Component {

    onNameChange(text){
        this.props.nameChange(text);
    }

    onDesChange(text){
        this.props.descriptionChange(text);
    }

    onAddImage(text){
        this.props.addImage(text);

    }



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
                this.onAddImage(source);
            }
        });




    }

    render() {

        const {styleFirstCard, styleButtonCard} = styles;
        const {nameChallenges, description} = this.props;

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
                            placeholder ="Name"
                            onChangeText={this.onNameChange.bind(this)}
                            value={nameChallenges}
                        />

                    </CardSection>
                    <CardSection>
                        <Input
                            label="Description"
                            placeholder="Description"
                            onChangeText={this.onDesChange.bind(this)}
                            value={description}
                        />
                    </CardSection>
                </Card>
                <Card style={styleButtonCard}>
                    <Button>
                        +
                    </Button>
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

    styleButtonCard: {
        borderWidth: 0,
        shadowColor: '#FFF'


    },
    

};

const mapStateToProps = ({newChallenges}) =>{
    const {nameChallenges, description, image} = newChallenges;
    return {nameChallenges, description, image};

};

export default connect(mapStateToProps, {nameChange, descriptionChange, addImage})(NewChallenges);