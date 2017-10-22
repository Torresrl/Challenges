import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import {
  userInfoFetch,
  addProfilePic,
  uploadUpdateProfilePicture,
  profileDetailPress
 } from '../../Actions';
import PrivateFeed from './PrivateFeed';

class Profile extends Component {

  render() {
      return (
         <View>
            <PrivateFeed />
        </View>
      );
  }
}

const mapStateToProps = ({ profile }) => {
  const {
    user,
    name,
    profilePicture,
    phoneNumber,
    render_profile_pic,
    chosen_picture_uri,
    toggle } = profile;

  return {
     user,
     name,
     profilePicture,
     phoneNumber,
     render_profile_pic,
     chosen_picture_uri,
     toggle };
};

export default connect(mapStateToProps,
  { userInfoFetch, addProfilePic, uploadUpdateProfilePicture, profileDetailPress })(Profile);

/*    if (this.props.render_profile_pic) {
      return (
        <View style={styleFirstCard}>
          <Card>
            <CardSection>
              <Image
              source={{ uri: this.props.chosen_picture_uri }}
              style={imageStyle} />
            </CardSection>

            <CardSection>
              <Button
                style={styleButton} onPress={() => {
                  this.onUploadPicture(this.props.chosen_picture_uri);
                }}>
                  Allright
                </Button>
              </CardSection>
              <CardSection>
              <Button
                  style={styleButton} onPress={() => {
                    this.chooseImage();
                  }}>
                  Retake
                </Button>
            </CardSection>
            <Text style={styles.errorTextStyle}>
              { this.props.error }
            </Text>
          </Card>
        </View>
      );
    }*/
