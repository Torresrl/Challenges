import React, {Component} from 'react';
import {Text, Image, ScrollView, View} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {Button, Input, Card, CardSection, Spinner} from '../common';
import AddChallengeList from './AddChallengeList';
import EditChallenge from './EditChallenge';
import {nameChange,
    descriptionChange,
    addImage,
}from '../../Actions';



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

    renderContent() {
        const {nameChallenges, description, challengesError, load} = this.props;
        if(load) {
            return (
                <View style = { styles.spinnerContainerStyle}>
                    <Spinner size="large"/>
                </View>
            );
        }

        return (
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

                <Text style={styles.errorTextStyle}>{challengesError}</Text>
                <AddChallengeList/>

                <EditChallenge
                    button1 = 'Add Challenge'
                    button2 = 'Submit'
                />
            </ScrollView>

        );
    }

    render() {

        return(
            <View>
                {this.renderContent()}
            </View>
            );
    }
}

styles = {
    styleFirstCard: {
        marginTop: 70
    },

    imageStyle: {
        height: 300,
        flex:1,
        width: null
    },

    errorTextStyle: {
        color: 'red',
        fontSize: 12,
        alignSelf: 'center'
    },

    spinnerContainerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 300

    }
};

const mapStateToProps = ({newChallenges}) =>{
    const {nameChallenges, description, image,
        challengeName, challengeDes,challengesError,
        load} = newChallenges;

    return {nameChallenges, description, image,
        challengeName, challengeDes,challengesError,
        load};

};

export default connect(mapStateToProps, {
        nameChange,
        descriptionChange,
        addImage,
    })(NewChallenges);