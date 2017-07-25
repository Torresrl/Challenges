import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import firebase from 'firebase';
import {Card} from '../../common';


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


    render(){
        const {comment, image} = this.props.post;
        const {imageStyle} = styles;

        return (
            <Card>
                <Image
                source={{uri: this.state.imageUrl}}
                style={imageStyle}
                />
                <Text >{comment}</Text>
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