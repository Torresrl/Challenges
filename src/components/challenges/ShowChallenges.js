import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import {connect} from 'react-redux';
import {getImage} from '../../Actions';
import {Spinner} from '../common';



class ShowChallenges extends Component {

    componentWillMount(){
        this.props.getImage(this.props.challenges.imageId);
    }

    renderImage() {
        const {url, load} = this.props;
        const {imageStyle} = styles;

        if(!load){
            return(
                <Image
                    source={{uri: url}}
                    style={imageStyle}
                />
            );

        }
        return(
            <Spinner/>
        );

    }


    render() {
        const {name} = this.props.challenges;

        return (
            <View style={styles.spinnerContainerStyle}>
                <Text>{name}</Text>
                {this.renderImage()}
            </View>
        );
    }
}

const styles = {
    spinnerContainerStyle: {
        flex: 1,
        alignItems: 'center',
        marginTop: 100

    },
    imageStyle: {
        height: 100,
        flex:1,
        width: 300
    }

};

const mapStateToProps = ({showChallenges}) => {
    const {url, load} = showChallenges;
    return {url, load};

};

export default connect(mapStateToProps, {getImage})(ShowChallenges);