import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import firebase from 'firebase';
import {Card, Spinner, CardSection} from '../../common';


class TimelineItem extends Component {

    constructor(){
        super();
        this.state = {
            imageUrl: ''
        };
    }

    componentWillMount(){
        const {image} = this.props.post;

        firebase.storage()
            .ref(image).getDownloadURL()
            .then((url) => {
                this.setState({imageUrl: url});
            });


    }

    renderImage(){
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
            return (
                    <Image
                        source={{uri: this.state.imageUrl}}
                        style={imageStyle}
                    />

            )
        }

    }


    render(){
        const {comment, userName} = this.props.post;

        return (
            <Card>
                <CardSection>
                    <Text>
                        {userName}
                    </Text>
                </CardSection>
                {this.renderImage()}
                <CardSection>
                    <Text >
                        {comment}
                    </Text>
                </CardSection>
            </Card>
        )
    }
}

const styles = {
    imageStyle: {
        flex: 1,
        height: 300
    },

};



export default TimelineItem;