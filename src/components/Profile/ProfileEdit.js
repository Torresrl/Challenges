import React, { Component } from 'react';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Input, Button, Card } from '../common';
import {
  userUpdate,
  saveUserUpdate,
  takeNewProfilePicture,
  addProfilePic,
  uploadProfilePicture,
  changeEmail,
  changePassword,
  userInfoFetch,
  uploadUpdateProfilePicture
 } from '../../Actions/';


class ProfileEdit extends Component {

  componentWillMount() {
   _.each(this.props.user, (value, prop) => {
     this.props.userUpdate({ prop, value });
   });


   this.props.userInfoFetch();
   console.log('Profile picture fetch successful');
 }

 onAddImage(text) {
   this.props.addProfilePic(text);
 }

 onUploadPicture(uri) {
   this.props.uploadUpdateProfilePicture(uri);
 }


 onChangeEmail() {
   this.props.changeEmail();
   Actions.reauthenticateUser();
 }

 onNewPassword() {
   this.props.changePassword();
   Actions.reauthenticateUser();
 }

 saveUserUpdate = () => {
   const { displayName, phoneNumber } = this.props;
   this.props.saveUserUpdate({ displayName, phoneNumber });
 };

 chooseImage() {
   ImagePicker.showImagePicker(null, (response) => {
     if (response.didCancel) {
       console.log('Cancel by user');
     } else if (response.error) {
       console.log('ImagePicker error: ', response.error);
     } else if (response.customButton) {
       console.log('User tapped custom button: ', response.customButton);
     } else {
       this.onAddImage(response.uri);
     }
   });
 }


  renderContent() {
    const { styleButton, textStyle, imageStyle } = styles;

      return (
        <ScrollView>
        <View style={styles.styleFirstCard}>
          <View>
            <Card>
              <TouchableOpacity onPress={() => this.chooseImage()}>
                <CardSection>
                  <Image
                  source={{ uri: this.props.profilePicture || this.props.user.photoURL }}
                  style={imageStyle}
                  />
                </CardSection>
              </TouchableOpacity>
            </Card>
          </View>

          <CardSection>
            <Input
              label="Name"
              value={this.props.name || this.props.user.displayName}
              onChangeText={value => this.props.userUpdate({ prop: 'displayName', value })}
            />
          </CardSection>

          <CardSection>
            <Button
              style={styleButton} onPress={this.onChangeEmail.bind(this)}
            >
              Change Email
            </Button>

            <Button
              style={styleButton} onPress={this.onNewPassword.bind(this)}
            >
              New Password
            </Button>
          </CardSection>

          <Text style={styles.errorTextStyle}>{this.props.error}</Text>

          <CardSection>
            <Button
              style={styleButton} onPress={this.saveUserUpdate.bind(this)}
            >
              Save
            </Button>
          </CardSection>
        </View>
        </ScrollView>
      );
  }

  render() {
    return (
      <View>
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  styleFirstCard: {
    marginTop: 70
  },
  styleButton: {
      borderWidth: 1
  },
  errorTextStyle: {
      color: 'red',
      fontSize: 12,
      alignSelf: 'center'

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
const {
        user,
        displayName,
        phoneNumber,
        error,
        name,
        profilePicture } = profile;

return {
        user,
        displayName,
        phoneNumber,
        error,
        name,
        profilePicture };
};

export default connect(mapStateToProps, {
  userUpdate,
  saveUserUpdate,
  takeNewProfilePicture,
  uploadProfilePicture,
  addProfilePic,
  changeEmail,
  changePassword,
  userInfoFetch,
  uploadUpdateProfilePicture
})(ProfileEdit);
