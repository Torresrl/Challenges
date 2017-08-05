import React, { Component } from 'react';
import _ from 'lodash';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Input, Button } from '../common';
import { userUpdate } from '../../Actions/';

class ProfileEdit extends Component {

  componentWillMount() {
   _.each(this.props.user, (value, prop) => {
     this.props.userUpdate({ prop, value });
   });
 }

  renderContent() {
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
              label="Email"
              value={this.props.email}
              onChangeText={value => this.props.userUpdate({ prop: 'email', value })}
            />
          </CardSection>
          <CardSection>
            <Input
              label="Phone"
              value={this.props.phoneNumber}
              onChangeText={value => this.props.userUpdate({ prop: 'phoneNumber', value })}
            />
          </CardSection>
          <CardSection>
            <Button styles={{ marginTop: 20 }}>
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
  }
};


const mapStateToProps = ({ profile }) => {
const { user, displayName, email } = profile;

return { user, displayName, email };
};

export default connect(mapStateToProps, { userUpdate })(ProfileEdit);
