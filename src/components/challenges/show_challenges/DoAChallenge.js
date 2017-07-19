import React, {Component} from 'react';
import {ScrollView, Text, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {Button, LargInput, Card, CardSection} from '../../common';
import {commentChange, addImageChallenge} from '../../../Actions';

class DoAChallenge extends Component {

    commentOnChange(text){
        this.props.commentChange(text);
    }

    onAddImage(text){
        this.props.addImageChallenge(text);
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
                //let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.onAddImage(response.data);

            }
        });
    }

    renderPicture() {
        const {image} = this.props;
        const{imageStyle} = styles;
        if(image){
            return (
                <Card>
                    <CardSection>
                        <Image source={{uri: `data:image/gif;base64,${image}`}}  style={imageStyle}/>
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
                <Card>
                    <CardSection>
                        <Button onPress={() => {this.chooseImage()}}>
                            Add Image
                        </Button>
                    </CardSection>
                </Card>
            );
        }
    }

    render(){
        const{name, description, comment} = this.props.challenge;
        const {
            headerStyle,
            descriptionStyle,
            headerCardStyle,
            CommentCardStyle

        } = styles;

        return(
            <ScrollView>
                <Card style={headerCardStyle}>
                    <CardSection>
                        <Text style={headerStyle}>{name}</Text>
                    </CardSection>
                    <CardSection>
                        <Text style={descriptionStyle}>{description}</Text>
                    </CardSection>
                </Card>

                {this.renderPicture()}

                <Card style={CommentCardStyle}>
                    <LargInput
                        label="Comment"
                        placeholder="Give a comment"
                        onChangeText={this.commentOnChange.bind(this)}
                        value={comment}
                    />
                </Card>

            </ScrollView>
        );
    }
}

const styles = {


    headerStyle: {
        fontSize: 22,

    },

    descriptionStyle: {

    },


    headerCardStyle: {
        marginTop: 70,
        alignSelf: 'stretch',
        marginLeft: 5,
        marginRight: 5,
        flex: 2
    },

    CommentCardStyle: {
        alignSelf: 'stretch',
        marginLeft: 5,
        marginRight: 5,
        flex: 3
    },
    imageStyle: {
        height: 300,
        flex:1,
        width: null
    },


};

const mapStateToProps = ({doAChallenge}) => {
    const {image, comment} = doAChallenge;
    return {image, comment};
};

export default connect(mapStateToProps, {commentChange, addImageChallenge}) (DoAChallenge);