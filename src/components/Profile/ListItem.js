import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from '../common';

class ListItem extends Component {

  render() {
    const { textStyle } = styles;
    const { uid } = this.props.item;
    return (
      <View>
        <Text style={textStyle}>
          {uid}
        </Text>
      </View>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 18,
    paddingLeft: 15

  }
};

const mapStateToProps = ({ profile }) => {
  const { retrievedChallenge } = profile;

  return { retrievedChallenge };
};


export default connect()(ListItem);
