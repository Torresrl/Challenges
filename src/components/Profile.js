import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Profile extends Component {

  constructor() {
    super();
    this.state = { profile_pic_url: '' };
  }

  getProfilePictureFromBase() {

  }


  render() {
    const { containerStyle } = styles;
      return (
          <View style={containerStyle}>
              <Text>Profile</Text>
          </View>
      );
  }
}

const styles = {
    containerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }

};

export default Profile;
