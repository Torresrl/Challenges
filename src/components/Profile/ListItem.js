import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  Text,
  TouchableWithoutFeedback,
  View
  } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from '../common';
import { selectChallange } from '../../Actions';

class ListItem extends Component {

  render() {
    const { textStyle } = styles;
    const { uid } = this.props.item;

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.props.selectChallange(uid);
          Actions.displaySelectedChallange({ challange: this.props.item });
          }
        }
      >
        <View style={{ marginTop: 200 }}>
          <CardSection>
            <Text style={textStyle}>
              {uid}
            </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

const mapStateToProps = ({ profile }, ownProps) => {
  const { selected_challange } = profile;
  const expanded = selected_challange === ownProps.item.uid;

  return { expanded };
};

export default connect(mapStateToProps, { selectChallange })(ListItem);
