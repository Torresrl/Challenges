import React, {Component} from 'react';
import {Text, Image, ScrollView, View} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {Button, Input, Card, CardSection} from './common';
import AddChallengeList from './AddChallengeList';
import {nameChange,
    descriptionChange,
    addImage,
    challengeNameChange,
    challengeDesChange,
    addChallenge
}from '../Actions';



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

    onChalNameChang(text){
        this.props.challengeNameChange(text);

    }

    onChalDesChang(text){
        this.props.challengeDesChange(text);

    }


    onAddChallenge(){
        const {challengeName, challengeDes} = this.props;
        this.props.addChallenge({name: challengeName, description: challengeDes})
    }



    renderPicture(){
        const {image} = this.props;
        const{styleFirstCard, imageStyle} = styles;
        if(image){
            return (
                <Card style={styleFirstCard}>
                    <CardSection>
                        <Image source={image} style={imageStyle}/>
                    </CardSection>
                    <CardSection>
                        <Button onPress={() => {this.chooseImage()}}>
                            Change Picture
                        </Button>
                    </CardSection>
                </Card>
            );
        } else {
            return (
                <Card style={styleFirstCard}>
                    <CardSection>
                        <Button onPress={() => {this.chooseImage()}}>
                            Add Picture
                        </Button>
                    </CardSection>
                </Card>
            );
        }
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

        const {styleButtonCard, styleAddButton} = styles;
        const {nameChallenges, description, challengeName, challengeDes} = this.props;

        return(
                <ScrollView >
                        {this.renderPicture()}
                    <Card>
                        <CardSection>
                            <Input
                                label="Name"
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

                    <AddChallengeList/>

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

                    <Card style={styleButtonCard}>
                        <Button
                            style={styleAddButton}
                            onPress={() =>{this.onAddChallenge()}}
                        >
                            Add Challeng
                        </Button>
                        <Button style={styleAddButton}>
                            Submit
                        </Button>
                    </Card>
                </ScrollView>
        );
    }
}

styles = {
    styleAddButton: {
        borderWidth: 1
    },


    styleFirstCard: {
        marginTop: 70
    },

    styleButtonCard: {
        borderWidth: 0,
        shadowColor: '#FFF',
        flexDirection: 'row',
        marginBottom: 70


    },
    imageStyle: {
        height: 300,
        flex:1,
        width: null
    }


};

const mapStateToProps = ({newChallenges}) =>{
    const {nameChallenges, description, image, challengeName, challengeDes} = newChallenges;
    return {nameChallenges, description, image, challengeName, challengeDes};

};

export default connect(mapStateToProps, {
        nameChange,
        descriptionChange,
        addImage,
        challengeNameChange,
        challengeDesChange,
        addChallenge
    })(NewChallenges);