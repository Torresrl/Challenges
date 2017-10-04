import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Input, Button } from '../common';
import {
  userUpdate,
  saveUserUpdate,
  takeNewProfilePicture,
  addProfilePic,
  uploadProfilePicture } from '../../Actions/';


class ProfileEdit extends Component {

  componentWillMount() {
   _.each(this.props.user, (value, prop) => {
     this.props.userUpdate({ prop, value });
   });
 }

 saveUserUpdate = () => {
   const { displayName, phoneNumber } = this.props;
   this.props.saveUserUpdate({ displayName, phoneNumber });
 };


  renderContent() {
    const { styleButton } = styles;

      return (
        <View style={styles.styleFirstCard}>
          <CardSection>
            <Input
              label="Name"
              value={this.props.displayName}
              onChangeText={value => this.props.userUpdate({ prop: 'displayName', value })}
            />
          </CardSection>
          <CardSection>
            <Input
              label="Phone"
              value={this.props.phoneNumber}
              onChangeText={value => this.props.userUpdate({ prop: 'phoneNumber', value })}
            />
          </CardSection>

          <Text style={styles.errorTextStyle}>{this.props.error}</Text>

          <CardSection>
            <Button
              styles={styleButton} onPress={this.saveUserUpdate.bind(this)}
            >
              Save
            </Button>
          </CardSection>
        </View>
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
      borderWidth: 2
  },
  errorTextStyle: {
      color: 'red',
      fontSize: 12,
      alignSelf: 'center'

  }
  };

const mapStateToProps = ({ profile }) => {
const { user, displayName, phoneNumber, error } = profile;

return { user, displayName, phoneNumber, error };
};

export default connect(mapStateToProps, {
  userUpdate,
  saveUserUpdate,
  takeNewProfilePicture,
  uploadProfilePicture,
  addProfilePic })(ProfileEdit);
