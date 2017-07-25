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
        const {comment, textStyle} = this.props.post;
        return (
            <Card>
                {this.renderImage()}
                <CardSection>
                    <Text style={textStyle}>
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

    textStyle: {
        fontSize: 13,
        padding: 10
    }

};



export default TimelineItem;