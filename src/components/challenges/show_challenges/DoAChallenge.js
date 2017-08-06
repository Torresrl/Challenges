import React, {Component} from 'react';
import firebase from 'firebase';
import {ScrollView, Text, Image, View} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {
    Button,
    LargInput,
    Card,
    CardSection,
    Spinner
} from '../../common';
import {
    commentChange,
    addImageChallenge,
    challengDone,
    getCurrentUserComment
} from '../../../Actions';
import DoAChallengeTimeline from './DoAChallengeTimeline';


class DoAChallenge extends Component {

    constructor() {
        super();
        this.state = {
            imageUrl: ''
        };
    }

    componentWillMount(){
        const{challengesId} = this.props;
        const{challengeId, done} = this.props.challenge;
        const {currentUser} = firebase.auth();

        if(done){
            this.props.getCurrentUserComment(challengesId, challengeId);

            firebase.storage()
                .ref('challenges/' + challengesId + '/'+ challengeId +
                    '/timeline/' + currentUser.uid).getDownloadURL()
                .then((url) => {
                    this.setState({imageUrl: url});
                });
        }
    }

    commentOnChange(text){
        this.props.commentChange(text);
    }

    onAddImage(text){
        this.props.addImageChallenge(text);
    }

    onChallengeFinished(){
        const {image, comment, challengesId, challenge, owner} = this.props;
        this.props.challengDone({image, comment,challengeId: challenge.challengeId, challengesId, owner});
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

    renderPictureNotDone() {
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
        const{name, description, comment, challengeId} = this.props.challenge;
        const {challengesId, error} = this.props;

    renderPictureDone() {
        const {imageUrl} = this.state;
        const {imageStyle} = styles;

        if(imageUrl.length == null || imageUrl.length === 0){
            return (
                <Spinner
                    size="small"
                    style={imageStyle}
                />
            )
        } else {
            return(
                <Image
                    source={{uri: this.state.imageUrl}}
                    style={imageStyle}/>
            )
        }
    }

    renderContentDoneOrNot() {
        const{done} = this.props.challenge;
        const{comment} = this.props;

        const {
            CommentCardStyle,
            styleButtonCard,
            styleButton,
            errorTextStyle
        } = styles;

        if(done){
            return (
                <View>
                    <Card>
                        <CardSection>
                            {this.renderPictureDone()}
                        </CardSection>
                        <CardSection>
                            <Text>
                                {comment}
                            </Text>
                        </CardSection>
                    </Card>
                </View>
            )
        } else {
            return (
                <View>
                    {this.renderPictureNotDone()}
                    <Card style={CommentCardStyle}>
                        <LargInput
                            label="Comment"
                            placeholder="Give a comment"
                            onChangeText={this.commentOnChange.bind(this)}
                            value={comment}
                        />
                    </Card>

                    <Card style={styleButtonCard}>
                        <Button
                            style={styleButton}
                            onPress={() => this.onChallengeFinished()}
                        >
                            Confirm
                        </Button>
                    </Card>
                </View>
            )
        }
    }

    render(){
        const{name, description, challengeId} = this.props.challenge;
        const {challengesId, owner} = this.props;
        const {
            headerStyle,
            headerCardStyle,
        } = styles;

        return(
            <ScrollView>
                <Card style={headerCardStyle}>
                    <CardSection>
                        <Text style={headerStyle}>{name}</Text>
                    </CardSection>
                    <CardSection>
                        <Text>{description}</Text>
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

                <Text style={errorTextStyle}>{error}</Text>

                <Card style={styleButtonCard}>
                    <Button
                        style={styleButton}
                        onPress={() => this.onChallengeFinished()}
                    >
                        Confirm

                {this.renderContentDoneOrNot()}
                <CardSection>
                    <Button>
                        All

                    </Button>
                    <Button>
                        friends
                    </Button>
                    <Button>
                        Top
                    </Button>
                </CardSection>
                <CardSection>
                    <DoAChallengeTimeline
                        challengesId={challengesId}
                        challengeId={challengeId}
                        owner={owner}

                    />
                </CardSection>

            </ScrollView>
        );
    }
}

const styles = {


    headerStyle: {
        fontSize: 22,

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

    styleButtonCard: {
        borderWidth: 0,
        shadowColor: '#FFF',
        flexDirection: 'row',
        marginBottom: 10
    },
    styleButton: {
        borderWidth: 1
    },
    errorTextStyle: {
        color: 'red',
        fontSize: 12,
        alignSelf: 'center'
    },

};

const mapStateToProps = ({doAChallenge}) => {
    const {image, comment, error} = doAChallenge;
    return {image, comment, error};
};

export default connect(mapStateToProps,
    {
        commentChange,
        addImageChallenge,
        challengDone,
        getCurrentUserComment
    }) (DoAChallenge);