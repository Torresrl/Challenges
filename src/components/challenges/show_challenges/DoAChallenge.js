import React, {Component} from 'react';
import {ScrollView, Text} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {Button, LargInput, Card, CardSection} from '../../common';
import {commentChange, addImageChallenge} from '../../../Actions';

class DoAChallenge extends Component {

    commentOnChange(text){
        this.props.commentChange(text);
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

            }
        });
    }

    render(){
        const{name, description, comment} = this.props.challenge;
        const {
            buttonStyle,
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
                <CardSection>
                <Button
                    style={buttonStyle}
                    onPress={() => this.chooseImage()}
                >
                    Add image
                </Button>
                </CardSection>
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

    buttonStyle: {
        borderWidth: 1,
        flex: 1
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
    }


};

const mapStateToProps = ({doAChallenge}) => {
    const {image, comment} = doAChallenge;
    return {image, comment};
};

export default connect(mapStateToProps, {commentChange, addImageChallenge}) (DoAChallenge);