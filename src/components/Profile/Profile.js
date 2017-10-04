import React, { Component } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  userInfoFetch,
  addProfilePic,
  uploadProfilePicture
 } from '../../Actions';
import { Card, CardSection } from '../common';

class Profile extends Component {


  componentWillMount() {
    this.props.userInfoFetch();
    console.log('Profile picture fetch successful');
  }
  render() {
    const { imageStyle, textStyle } = styles;
      return (
          <Card>
            <TouchableOpacity onPress={() => Actions.displayNewProfilePicture()}>
              <CardSection>
                <Image
                source={{ uri: this.props.profilePicture || this.props.user.photoURL }}
                style={imageStyle}
                />
              </CardSection>
            </TouchableOpacity>
            <CardSection>
              <Text style={textStyle}>Name: {this.props.name || this.props.user.displayName}</Text>
            </CardSection>
            <CardSection>
              <Text style={textStyle}>Phone: {this.props.phoneNumber || this.props.user.phoneNumber}</Text>
            </CardSection>
            <CardSection>
              <Text style={textStyle}>Display random stuff here</Text>
            </CardSection>
            <CardSection>
              <Text style={textStyle}>Display random stuff here</Text>
            </CardSection>
            <CardSection>
              <Text style={textStyle}>Display random stuff here</Text>
            </CardSection>
            <CardSection>
              <Text style={textStyle}>Peace out</Text>
            </CardSection>
          </Card>
      );
  }
}

const styles = {
    containerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    imageStyle: {
        height: 300,
        flex: 1,
        width: null
    },

    textStyle: {
      fontSize: 18,
      paddingLeft: 6
    }

};


const mapStateToProps = ({ profile }) => {
  const { user, name, profilePicture, phoneNumber } = profile;

  return { user, name, profilePicture, phoneNumber };
};

export default connect(mapStateToProps, { userInfoFetch, addProfilePic, uploadProfilePicture })(Profile);
