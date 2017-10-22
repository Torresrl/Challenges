import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, Image, FlatList, TouchableWithoutFeedback } from 'react-native';
import { CardSection, Card } from '../common';
import { ListItem } from './ListItem';

class DisplaySelectedChallange extends Component {

  renderItem({ item }) {
    return (
      <TouchableWithoutFeedback onPress={() => console.log('ere')}>
        <Card style={{ marginTop: 6 }}>
          <CardSection>
            <Text>{item.name}</Text>
          </CardSection>
          <CardSection>
            <Text>{item.description}</Text>
          </CardSection>
        </Card>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const challengesList =
        _.map(this.props.challange.challenges, (val, uid) => { return { ...val, uid }; });

    return (
      <View>
        <FlatList
          style={{ marginTop: 70 }}
          data={challengesList}
          keyExtractor={item => item.challengeId}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

/*
/*<Image
source={{ uri: item.timeline }}
style={imageStyle}
/>*/


const styles = {
  imageStyle: {
      height: 300,
      flex: 1,
      width: null
  }
};

export default DisplaySelectedChallange;
